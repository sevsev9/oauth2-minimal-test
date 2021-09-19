import {Request, Response} from "express";
import path from "path";
import {findUser} from "../db/dbUtil";

export function testFileRoute(req: Request, res: Response) {
    res.status(200);
    res.sendFile(path.resolve("public/index.html"));
}


//@Todo secure endpoint of scraping attacks
export function usernameExists(req: Request, res: Response) {
    if (req.query.username) {
        const usrname: string = req.query.username.toString();
        findUser(usrname).then(usr => {
            res.status(200);
            res.send(usr.length !== 0);
            res.end();
        }).catch(err => {
            res.status(500);
            res.send(err);
            res.end();
        });
    } else {
        res.status(400);
        res.send("Malformed request! Query has to include username.");
        res.end();
    }
}