import mongoose from "mongoose";

export interface Token {
    identifier: string;
    expirationAt: Date;
    createdAt: Date;
    isSent: boolean;
    token: string;
    type: string; // MFA, ACCOUNT_CONFIRMATION, PASSWORD_RECOVERY
}

export default mongoose.model<Token & mongoose.Document>("Tokens", new mongoose.Schema<Token & mongoose.Document>({
    identifier: { type: String, unique: true, required: true },
    expirationAt: { type: Date, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    isSent: { type: Boolean, required: true },
    token: { type: String, unique: true, required: true },
    type: { type: String, required: true }
}))