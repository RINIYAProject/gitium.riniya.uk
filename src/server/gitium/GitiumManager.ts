import { Git, PushData } from 'node-git-server';
import { join } from "path";
import ServerManager from '..';
import { fetchUser } from '@riniya.ts/types';
import { User } from '../database/models/User';

export default class GitiumManager {
    public port: number = ServerManager.getInstance().getEnvironement().read<number>("GITIUM_SERVER_PORT") || 8090;
    public path: string = ServerManager.getInstance().getEnvironement().read<string>("GITIUM_SERVER_REPOSITORIES_PATH") || join(__dirname, '../repos');

    public readonly gitium: Git;

    public constructor() {
        this.gitium = new Git(this.path, {
            authenticate: ({ type, user }, next) =>
            type == 'push' 
            ? user(async (username, password) => {
                const user: User = await fetchUser(username, password)
                if (user.security.isEmailVerified
                    && user.security.isMFAEnabled
                    && user.security.isOnboardFinished
                    && user.roleIdentifier === "admin_read_write") {
                        next()
                } else if (user.security.isTerminated) {
                    next(new Error("This user has been terminated due to TOS violation."))
                } else {
                    next(new Error("This user does not meet all the requirements to perform this action."))
                }
            })
            : next(),
            autoCreate: true
        });

        this.gitium.on('push', async (push) => {
            push.log();
            push.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            push.log(`Gitium version : ${ServerManager.getInstance().getEnvironement().read<Number>("VERSION")}`);
            push.log(`Gitium revision : ${ServerManager.getInstance().getEnvironement().read<Number>("REVISION")}`);
            push.log(`Pushing to **${push.repo}**`);
            push.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            push.log();
            push.accept()
        });

        this.gitium.on('fetch', (fetch) => {
            fetch.accept();
        });

        this.gitium.listen(this.port)
    }
}