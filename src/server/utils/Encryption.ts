import * as bcrypt from "bcrypt"
import ServerManager from "@riniya.ts/server/index"
import { isNull } from "@riniya.ts/types"

export default class Encryption {
    private static fetchSalt(): string {
        return bcrypt.genSaltSync(10)
    }
    
    public static generateHash(value: string): string {
        if (isNull(value))
            throw new Error("Cannot hash null value.")
        return bcrypt.hashSync(value, this.fetchSalt())
    }

    public static compare(fX: string, fV: string): Boolean {
        if (isNull(fX) || isNull(fV))
            throw new Error("Cannot compare blank values.")
        return bcrypt.compareSync(
            fX, fV
        )
    }
}