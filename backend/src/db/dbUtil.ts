import {connect} from "mongoose";
import {UserModel} from "./dbSchemas";
import {IGitHubUser} from "../types/GitHubUser";
import {IMinimalUser} from "../types/MinimalUser";

export function dbConnect(host: string, port: number | string, authDatabase: string, username: string, password: string, database: string) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            await connect(`mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authDatabase}&readPreference=primary`, {
                // @ts-ignore
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error: any) {
            reject(error);
        }
        resolve("Successfully connected to MongoDB Server!");
    })
}

export function createUser(user: IGitHubUser) {
    return new UserModel({
        uid: user.id,
        username: user.login,
        password: (user.password) ? user.password : "",
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        location: user.location,
        blog: user.blog,
    }).save();
}

export function createMinimalUser(user: IMinimalUser) {
    return new UserModel({
        username: user.username,
        password: "",
        email: user.email,
        name: user.name
    }).save();
}

export function findUser(username: String) {
    return UserModel.find({username: username}).exec();
}