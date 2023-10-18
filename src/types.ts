import User, { User as IUser } from "@riniya.ts/server/database/models/User";
import Encryption from "@riniya.ts/server/utils/Encryption";

export declare type Str = String | string;
export declare type Int = Number | number;
export declare type Bool = Boolean | boolean;
export declare type Result = {
    status: boolean;
    error: string;
}

/**
 * @param object The object to check.
 * @description Checking is a object is null.
 */
export function isNull(object: unknown): Boolean {
    if (object === null || object === undefined)
        return true
    return false
}

/**
 * @param object The object to check.
 * @description Checking is a object is null and then checking is the type is the same. 
 */
export function isTypeNull<T>(object: unknown): Boolean {
    if (object === null || object === undefined || !(object as T))
        return true
    return false
}

/**
 * @param username
 * @param password
 * @description Fetching a user account with the credentials.
 */
export async function fetchUser(username: string, password: string): Promise<IUser> {
    const profile = await User.findOne({username: username})
    return new Promise<IUser>((resolve, reject) => {
        if (!isNull(profile) && isNull(profile.identifier)) {
            reject({
                status: false,
                error: "Please check the username or password."
            })
        } else {
            if (Encryption.compare(password, profile.password)) {
                resolve(profile)
            } else {
                reject({
                    status: false,
                    error: "The password does not match."
                })
            }
        }
    })
}