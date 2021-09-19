export interface IMinimalUser {
    username: String,
    email: String,
    name: String
}

export class MinimalUser implements IMinimalUser {
   readonly email: String;
   readonly name: String;
   readonly username: String;

    constructor(email: String, name: String, username: String) {
        this.email = email;
        this.name = name;
        this.username = username;
    }
}