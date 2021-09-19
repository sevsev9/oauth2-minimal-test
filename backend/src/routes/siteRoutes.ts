import {Request, Response} from "express";
import path from "path";

export function testFileRoute(req: Request, res: Response) {
    res.status(200);
    res.sendFile(path.resolve("public/index.html"));
}