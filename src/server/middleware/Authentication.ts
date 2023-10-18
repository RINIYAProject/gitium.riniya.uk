import BaseMiddleware, { CustomRequest, UserToken } from "@riniya.ts/server/base/BaseMiddleware"
import ServerManager from "@riniya.ts/server/index"
import { isNull, isTypeNull } from "@riniya.ts/types"
import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

class Authentication extends BaseMiddleware {
    public handle(request: CustomRequest, response: Response, next: NextFunction) {
        const token = request.header("Authorization")?.replace("Bearer ", "");

        if (isNull(token))
            return response.status(403).json({
                status: false,
                error: "AUTHENTICATION_REQUIRED",
                message: "Please authenticate to use the resources."
            }).end();
    
        jwt.verify(token, ServerManager.instance.environement.read<string>("JWT_SECRET_KEY").replaceAll('-', ''), (error, decoded) => {

            if (error) {
                return response.status(403).json({
                    status: false,
                    error: error.cause,
                    message: error.message
                }).end();
            }

            if (isTypeNull<CustomRequest>(decoded))
                return response.status(500).json({
                    status: false,
                    error: "Invalid account data or signature does not match."
                }).end();
            
            request.token = decoded
            return next();
        }) 
    }
}

export default new Authentication()