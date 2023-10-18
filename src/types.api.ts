import IBlacklist, { IBlacklist as Blacklist } from "@riniya.ts/server/database/models/api/Common/Blacklist";
import Guild, { Guild as IGuild } from "@riniya.ts/server/database/models/api/Guild";
import Member, { Member as IMember } from "@riniya.ts/server/database/models/api/Member";
import { isNull } from "@riniya.ts/types";
import Sanction, { Sanction as ISanction } from "@riniya.ts/server/database/models/api/Sanction";
import Verification, { Verification as IVerif } from "@riniya.ts/server/database/models/api/Verification";
import Activity, { Activity as IActivity } from "@riniya.ts/server/database/models/api/Activity";
import Message, { Message as IMessage } from "@riniya.ts/server/database/models/api/Common/Message";
import Profile, { Profile as IProfile } from "./server/database/models/api/Common/Profile";

export async function fetchBlacklist(identifier: string): Promise<Blacklist> {
    const cases = await IBlacklist.findOne({
        _id: identifier
    })
    return new Promise<Blacklist>((resolve, reject) => {
        if (!isNull(cases) && isNull(cases.userId)) {
            reject({
                status: false,
                error: "This user is not blacklisted."
            })
        } else {
            resolve(cases)
        }
    })
}

export async function removeBlacklist(identifier: string): Promise<Boolean> {
    const cases = await IBlacklist.findOne({
        _id: identifier
    })
    return new Promise<Boolean>(async (resolve, reject) => {
        if (!isNull(cases) && isNull(cases.userId)) {
            reject({
                status: false,
                error: "This user is not blacklisted."
            })
        } else {
            const rem = await IBlacklist.deleteOne({
                _id: cases._id
            })
            resolve(rem.acknowledged)
        }
    })
}

export async function fetchGuilds(): Promise<IGuild[]> {
    const guilds = (await Guild.find({})).map(x => {
        return x
    })
    return new Promise<IGuild[]>(async (resolve) => {
        resolve(guilds)
    })
}

export async function fetchGuildById(identifier: string): Promise<IGuild> {
    const guild = await Guild.findOne({
        guildId: identifier
    })
    return new Promise<IGuild>(async (resolve, reject) => {
        if (!isNull(guild) &&isNull(guild.ownerId)) {
            reject({
                status: false,
                error: "This guild does not exists."
            })
        } else {
            resolve(guild)
        }
    })
}

export async function fetchGuildMembers(identifier: string): Promise<IMember[]> {
    const members = await Member.find({
        guildId: identifier
    })
    return new Promise<IMember[]>((resolve, reject) => {
        if (!isNull(members) && isNull(members.values())) {
            reject({
                status: false,
                error: "This server is not synchronised."
            })
        } else {
            resolve(members)
        }
    })
}

export async function fetchGuildMember(identifier: string, memberId: string): Promise<IMember> {
    const members = await Member.findOne({
        guildId: identifier,
        memberId: memberId
    })
    return new Promise<IMember>((resolve, reject) => {
        if (!isNull(members) && isNull(members.username)) {
            reject({
                status: false,
                error: "This server is not synchronised or this member is not anymore on the server."
            })
        } else {
            resolve(members)
        }
    })
}

export async function fetchGuildMemberProfile(identifier: string): Promise<IProfile> {
    const profile = await Profile.findOne({
        userId: identifier
    })
    return new Promise<IProfile>((resolve, reject) => {
        if (!isNull(profile) && isNull(profile.economy)) {
            reject({
                status: false,
                error: "This member don't have a local profile."
            })
        } else {
            resolve(profile)
        }
    })
}

export async function fetchGuildMemberSanction(identifier: string, memberId: string): Promise<ISanction[]> {
    const sanctions = await Sanction.find({
        guildId: identifier,
        memberId: memberId
    })
    return new Promise<ISanction[]>((resolve, reject) => {
        if (!isNull(sanctions) && isNull(sanctions.values())) {
            reject({
                status: false,
                error: "This member have no past or active sanctions."
            })
        } else {
            resolve(sanctions)
        }
    })
}

export async function fetchGuildVerifications(identifier: string): Promise<IVerif[]> {
    const verifications = await Verification.find({
        guildId: identifier
    })
    return new Promise<IVerif[]>(async (resolve, reject) => {
        if (!isNull(verifications) && isNull(verifications.values())) {
            reject({
                status: false,
                error: "This guild does not exists."
            })
        } else {
            resolve(verifications)
        }
    })
}

export async function fetchGuildVerificationById(identifier: string, verificationId: string): Promise<IVerif> {
    const verifications = await Verification.findOne({
        _id: verificationId,
        guildId: identifier,
    })
    return new Promise<IVerif>(async (resolve, reject) => {
        if (!isNull(verifications) && isNull(verifications.answers)) {
            reject({
                status: false,
                error: "This verification does not exists."
            })
        } else {
            resolve(verifications)
        }
    })
}

export async function fetchGuildActivity(identifier: string): Promise<IActivity[]> {
    const activities = await Activity.find({
        guildId: identifier,
    })
    return new Promise<IActivity[]>(async (resolve, reject) => {
        if (!isNull(activities) && isNull(activities.values())) {
            reject({
                status: false,
                error: "This activities does not exists."
            })
        } else {
            resolve(activities)
        }
    })
}

export async function fetchGuildActivityById(identifier: string, activityId: string): Promise<IActivity> {
    const activities = await Activity.findOne({
        _id: activityId,
        guildId: identifier
    }, null, {
        sort: {
            registeredAt: -1
        },
        limit: 10
    })
    return new Promise<IActivity>(async (resolve, reject) => {
        if (!isNull(activities) && isNull(activities.type)) {
            reject({
                status: false,
                error: "This activity does not exists."
            })
        } else {
            resolve(activities)
        }
    })
}

export function createActivity(data: IActivity) {
    new Activity({
        guildId: data.guildId,
        memberId: data.memberId,
        type: data.type,
        action: data.action,
        registeredAt: data.registeredAt
    }).save()
}

export async function fetchGuildMessages(identifier: string): Promise<IMessage[]> {
    const messages = await Message.find({
        guildId: identifier,
    })
    return new Promise<IMessage[]>(async (resolve, reject) => {
        if (!isNull(messages) && isNull(messages.values())) {
            reject({
                status: false,
                error: "This server don't have any message."
            })
        } else {
            resolve(messages)
        }
    })
}

export async function fetchGuildMessageById(identifier: string, messageId: string): Promise<IMessage> {
    const messages = await Message.findOne({
        _id: messageId, 
        guildId: identifier
    })
    return new Promise<IMessage>(async (resolve, reject) => {
        if (!isNull(messages) && isNull(messages.content)) {
            reject({
                status: false,
                error: "This server don't have any message."
            })
        } else {
            resolve(messages)
        }
    })
}

export async function fetchGuildMessageByMember(identifier: string, memberId: string): Promise<IMessage[]> {
    const messages = await Message.find({
        guildId: identifier,
        memberId: memberId
    })
    return new Promise<IMessage[]>(async (resolve, reject) => {
        if (!isNull(messages) && isNull(messages.values())) {
            reject({
                status: false,
                error: "This member don't have any message."
            })
        } else {
            resolve(messages)
        }
    })
}

