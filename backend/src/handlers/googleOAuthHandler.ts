import {OAuth2Client} from "google-auth-library";
import {Request, Response} from "express";
import {createMinimalUser, findUser} from "../db/dbUtil";
import {MinimalUser} from "../types/MinimalUser";

const url = 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,genders';
let client: OAuth2Client;

export function startAuth(req: Request, res: Response) {
    client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        'http://localhost:8080/google/callback'
    );

    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    });

    res.redirect(authUrl);
}

export function authCallback(req: Request, res: Response) {
    const code = ""+req.query.code;

    if (client) {
        client.getToken(code).then(resp => {
            client.setCredentials(resp.tokens);
            console.log('Tokens acquired!');    //@Debug
            res.redirect(`/google/userdata`); //@Todo fix redirect not working
            res.end();
        }).catch(err => {
            res.status(500);
            res.send(err);
            res.end();
        })
    } else res.redirect('/');

}

export function login(req: Request, res: Response) {
    console.log('Hello login function');
    client.request({url}).then(resp => {
        console.log(resp.data);
        const name = {
            // @ts-ignore
            fname: resp.data.names[0].givenName,
            // @ts-ignore
            lname: resp.data.names[0].familyName
        };
        // @ts-ignore
        const mail = resp.data.emailAddresses[0].value
        console.log('mail: ', mail);

        async function getUname() {
            let uname:string = ""+name.fname+name.lname
            while (true) {
                const res = await findUser(uname);
                if (res.length > 0) {
                    uname+=Math.round(Math.random()*10);
                } else {
                    break;
                }
            }
            return uname;
        }

        getUname().then(uname => {
            console.log(uname);
            //create user in database
            createMinimalUser(new MinimalUser(mail, name.fname+name.lname, uname)).then(usr => {
                console.log(usr); //@Debug
                res.status(200);
                //send user to screen where he can fill out additional info
                res.send({
                    name: name,
                    mail: mail,
                    username: uname
                });
                //res.redirect('/complete-login');
                res.end();
            }).catch(err => {
                console.log(err);
                res.end();
            })
        });
    }).catch(err => {
        console.log(err);
        res.end();
    });
}
