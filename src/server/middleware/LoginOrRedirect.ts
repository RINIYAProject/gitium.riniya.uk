import BaseMiddleware, { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware"
import { NextFunction, Response } from "express"
import { isNull } from "@riniya.ts/types"

export default class LoginOrRedirect extends BaseMiddleware {
    public handle(request: CustomRequest, response: Response, next: NextFunction) {
        if (isNull(request.token))
            return response.redirect("/security/login")
        else return next()
    }
}