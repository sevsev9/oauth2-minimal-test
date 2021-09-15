import axios from "axios";
import {Request, Response} from "express";
import path from "path";

export function testFileRoute(req: Request, res: Response) {
    res.status(200);
    res.sendFile(path.resolve("public/index.html"));
}

export function authGitHub(req: Request, res: Response) {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    )
}

export function oAuthReturnRoute(req: Request, res: Response) {
    const { code } = req.query;
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
    };
    const opts = { headers: { accept: 'application/json'} };
    axios.post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => {
        console.log(`Access Token: ${_res.data.access_token}`);
        res.redirect(`/userdata?token=${_res.data.access_token}`);
    }).catch(err => {
        res.status(500).json( {err: true, msg: err.message});
    });
}

