import mongoose from "mongoose";

export interface MFA {
    indentifier: string;
    mfaSecuritySecret: string;
    mfaBackupCode: string;
    mfaCreatedAt: Date;
}

export default mongoose.model<MFA & mongoose.Document>("MFA", new mongoose.Schema<MFA & mongoose.Document>({
    indentifier: { type: String, unique: true, required: true },
    mfaSecuritySecret: { type: String, unique: true, required: true },
    mfaBackupCode: { type: String, unique: true, required: true },
    mfaCreatedAt: { type: Date, default: Date.now() }
}))