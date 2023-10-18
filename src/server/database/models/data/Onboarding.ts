import mongoose from "mongoose";

export interface Onboarding {
    identifier: string;
    onboardStep: number;
}

export default mongoose.model<Onboarding & mongoose.Document>("onboarding", new mongoose.Schema<Onboarding & mongoose.Document>({
    identifier: { type: String, unique: true, required: true },
    onboardStep: { type: Number, required: true, default: 1 }
}))