import {connect} from "mongoose";
import {UserModel} from "./dbSchemas";
import {IGitHubUser} from "../types/GitHubUser";

export function dbConnect(host: String, port: Number | String, authDatabase: String, username: String, password: String) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            await connect(`mongodb://${username}:${password}@${host}:${port}/?authSource=${authDatabase}&readPreference=primary`, {
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
    const usr = new UserModel({
        uid: user.id,
        username: user.login,
        password: (user.password) ? user.password : "",
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        location: user.location,
        blog: user.blog,
    });
    return usr.save();
}

export function findUser(username: String) {
    return UserModel.find({username: username}).exec();
}