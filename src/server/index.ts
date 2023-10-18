import * as dotenv from "dotenv";
dotenv.config()

global.__rootdir__ = __dirname || process.cwd();

declare global {
    var __rootdir__: string;
}

import 'module-alias/register';

import GitiumManager from "@riniya.ts/server/gitium/GitiumManager";
import Environement from "@riniya.ts/server/utils/Environement";
import Authentication from "@riniya.ts/server/middleware/Authentication";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";
import Database from "@riniya.ts/server/database/index";
import { Int, Str } from "@riniya.ts/types";

import express, { Request, Response } from "express"
import RateLimit from "express-rate-limit"
import * as parser from "body-parser"
import session from "express-session"
import http from "http";
import cors from "cors";


const app = express();
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 4,
    skipSuccessfulRequests: true,
    message: {
        status: false,
        error: "Too many request."
    }
})
app.use(limiter)
app.use(parser.json())

export default class ServerManager {

    public static instance: ServerManager

    private routes: Map<Int, BaseRoute> = new Map<Int, BaseRoute>()
    private server: http.Server

    public readonly environement: Environement

    private readonly version: String
    private readonly revision: String

    private readonly database: Database
    private readonly gitiumManager: GitiumManager

    public constructor() {
        ServerManager.instance = this
        this.environement = new Environement()
        this.environement.catch<Error>()
        this.database = new Database()
        this.gitiumManager = new GitiumManager()

        this.version = this.environement.read<Str>("VERSION") || "No version set."
        this.revision = this.environement.read<Str>("REVISION") || "No revision set."

        if (this.environement.init()) {
            console.error("-> Failed to setup the configuration.")
        } else {
            console.log("-> Configuration loaded.")
            console.log(`-> Version : ${this.version}`)
            console.log(`-> Revision : ${this.revision}`)

            this.startServices()
        }
    }

    private startServices() {
        if (this.database.connectMongoDB()) {
            console.log("-> Connected to the database.")
        } else {
            console.error("-> Impossible to reach the database.")
        }

        this.startApp()
    }

    public startApp() {
        app.set("trust proxy", 1)
        app.use(cors({
            origin: this.environement.read<string>("CORS_ALLOWED_ORIGINS"),
            methods: this.environement.read<string>("CORS_ALLOWED_METHODS")
        }))

        app.use(session({
            secret: this.environement.read<string>("COOKIE_SESSION_SECRET"),
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))

        this.server = http.createServer(app)

        app.get('/', (req: Request, res: Response) => {
            return res.status(200).json({
                appName: 'Riniya RESTFul API',
                appVersion: this.version,
                appRevision: this.revision,
                appAuthors: [
                    "NebraskyTheWolf <farfy.dev@gmail.com>"
                ]
            }).end()
        })

        if (this.routes.size >= 1) {
            this.routes.forEach(x => {
                if (x.isProtected()) {
                    console.log(`[+] Registering router : ${x} as 'protected'`)
                    app.use('/api', Authentication.handle , x.routing())
                }
                else {
                    console.log(`[+] Registering router : ${x} as 'un-protected'`)
                    app.use('/api', x.routing())
                }
            })
        }

        this.server.listen(this.environement.read<Int>("PORT") || 3659)
    }

    public static getInstance(): ServerManager {
        return this.instance
    }

    public getEnvironement(): Environement {
        return this.environement
    }
}

export const serverManager: ServerManager = new ServerManager()