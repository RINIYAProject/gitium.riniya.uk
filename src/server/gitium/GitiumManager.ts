import { Git, PushData } from 'node-git-server';
import { join } from "path";
import ServerManager from '..';
import { fetchUser } from '@riniya.ts/types';

export default class GitiumManager {
    public port: number = ServerManager.getInstance().getEnvironement().read<number>("GITIUM_SERVER_PORT") || 8090;
    public path: string = ServerManager.getInstance().getEnvironement().read<string>("GITIUM_SERVER_REPOSITORIES_PATH") || join(__dirname, '../repos');

    public readonly gitium: Git;

    public constructor() {
        this.gitium = new Git(this.path, {
            authenticate: ({ type, user }, next) =>
            type == 'push' 
            ? user(([username, password]) => {
                fetchUser(username, password).then((result) => {
                    if (result.security.isEmailVerified 
                        && result.security.isMFAEnabled
                        && result.security.isOnboardFinished) {
                            next()
                    } else if (result.security.isTerminated) {
                        next("This user has been terminated and cannot perform this action.")
                    }
                }).catch((error) => {
                    next(error.reason)
                })
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