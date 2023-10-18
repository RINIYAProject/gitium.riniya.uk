import { isNull } from "@riniya.ts/types";

export default class Environement {
    public init(): Boolean {
        if (this.unset("MONGODB_URL"))
            return this.print("MONGODB_URL")
        else if (this.unset("CORS_ALLOWED_ORIGINS"))
            return this.print("CORS_ALLOWED_ORIGINS")
        else if (this.unset("CORS_ALLOWED_METHODS"))
            return this.print("CORS_ALLOWED_METHODS")
        else if (this.unset("PORT"))
            return this.print("PORT")
        else if (this.unset("ENVIRONEMENT"))
            return this.print("ENVIRONEMENT")
        else if (this.unset("JWT_SECRET_KEY"))
            return this.print("JWT_SECRET_KEY")
        else if (this.unset("BCRYPT_SALT_ROUND"))
            return this.print("BCRYPT_SALT_ROUND")
        else if (this.unset("COOKIE_SESSION_SECRET"))
            return this.print("COOKIE_SESSION_SECRET")
        else if (this.unset("GITIUM_SERVER_PORT"))
            return this.print("GITIUM_SERVER_PORT")
        else if (this.unset("GITIUM_SERVER_REPOSITORIES_PATH"))
            return this.print("GITIUM_SERVER_REPOSITORIES_PATH")
        return false
    }

    public unset(key: string): Boolean {
        return isNull(process.env[key])
    }

    public read<T>(key: string): T {
        if (this.unset(key))
            this.print(key)
        return process.env[key] as T
    }

    public catch<T>() {
        process.on('uncaughtException', function (error: Error) {
            console.error(`-> 'uncaughtException' : ${error.message} : ${error.cause}`)
        })
        process.on('unhandledRejection', function (error: Error) {
            console.error(`-> 'unhandledRejection' : ${error.stack}`)
        })
    }

    private print(key: string): Boolean {
        console.error("-------------------------------------------")
        console.error(" -> Environement failed at '" + key + "'.  ")
        console.error("   -> Please check your environement file. ")
        console.error("   -> Restart is required to continue.     ")
        console.error("-------------------------------------------")
        return true;
    }
}