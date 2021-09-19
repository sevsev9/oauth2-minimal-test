import axios from "axios";
import {Request, Response} from "express";
import {IGitHubUser} from "../types/GitHubUser";
import {createUser, findUser} from "../db/dbUtil";


export function auth(req: Request, res: Response) {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    )
}

export function callback(req: Request, res: Response) { //response from the GitHub OAuth API
    const {code} = req.query;
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
    };
    const opts = {headers: {accept: 'application/json'}};
    axios.post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => {
            console.log(`Access Token: ${_res.data.access_token}`);
            res.redirect(`/github/userdata?token=${_res.data.access_token}`);
        }).catch(err => {
        res.status(500).json({err: true, msg: err.message});
    });
}

export function login(req: Request, res: Response) {
    axios.get('https://api.github.com/user', {
        headers: {
            Authorization: 'token ' + req.query.token
        }
    }).then(_res => {  //Requesting the user data with the OAuth Token
        const ghusr: IGitHubUser = JSON.parse(JSON.stringify(_res.data));   //parsing the returned userdata by github
        console.log(ghusr);
        findUser(ghusr.login).then(usr => { //Returns the user document if the user can be found in the database
            //@Todo login the user
            if (usr.length > 0) {
                res.status(200);
                res.send('Login will be implemented here. <br>' + JSON.stringify(usr));
                res.end();
            } else {
                createUser(ghusr).then(r => {
                    res.status(200);
                    res.send(r);
                    res.end();
                }).catch(err => {
                    res.status(500);
                    res.send(err);
                    res.end();
                });
            }
        }).catch((err) => { //The user cannot be found in the database -> create the user
            res.status(500);
            res.send(err);
            res.end();
        })
    }).catch(err => {
        res.status(500);
        res.send(err);
        res.end();
    })
}

