import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    uid: Number,
    username: String,
    password: String,
    email: String,
    name: String,
    avatar_url: String,
    bio: String,
    location: String,
    blog: String
}

const UserSchema: Schema = new Schema({
    uid: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: String, //not required due to OAuth
    email: {type: String, required: true, unique: true}, //client sided 512bit encrypted
    name: String,
    avatar_url: String,
    bio: String,
    location: String,
    blog: String
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

