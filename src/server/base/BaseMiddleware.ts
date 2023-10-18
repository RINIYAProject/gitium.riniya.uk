import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Partials, Security } from "../database/models/User";

export interface UserToken {
    roleIdentifier: string;
    identifier: string;
    username: string;
    security: Security;
    profile: Partials;
    email: string;
}

export interface CustomRequest extends Request {
    token?: string | JwtPayload
}

export default abstract class BaseMiddleware {
    public abstract handle(request: CustomRequest, response: Response, next: NextFunction): void
}