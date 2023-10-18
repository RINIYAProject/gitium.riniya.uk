import mongoose from "mongoose";

export interface Partials {
    avatarURL: string;
    bannerURL: string;
    language: string;
    country: string;
    discordIdentifier?: string;
}

export interface Security {
    isMFAEnabled: boolean;
    isEmailVerified: boolean;
    isTerminated: boolean;
    isOnboardFinished: boolean;
}

export interface User {
    roleIdentifier: string;
    identifier: string;
    username: string;
    password: string;
    email: string;
    profile: Partials;
    security: Security;
}

export default mongoose.model<User & mongoose.Document>("Users", new mongoose.Schema<User & mongoose.Document>({
    roleIdentifier: { type: String, required: true },
    identifier: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profile: { type: Object, required: true },
    security: { type: Object, required: true }
}));