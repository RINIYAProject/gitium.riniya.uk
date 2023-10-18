import mongoose from "mongoose";

export interface UserRole {
    identifier: string;
    name: string;
    description?: string;
}

export default mongoose.model<UserRole & mongoose.Document>("roles", new mongoose.Schema<UserRole & mongoose.Document>({
    identifier: { type: String, unique: true, required: true },
    description: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
}))