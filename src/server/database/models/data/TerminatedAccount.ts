import mongoose from "mongoose";

export interface Account {
    indentifier: string;
    reasons: string;
    issuer: string;
    createdAt: Date;
}

export default mongoose.model<Account & mongoose.Document>("TerminatedAccounts", new mongoose.Schema<Account & mongoose.Document>({
    indentifier: { type: String, unique: true, required: true },
    reasons: { type: String, required: true },
    issuer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
}))