import {Router} from "express";
import {auth, callback, login} from "../handlers/gitHubOAuthHandler";

const router = Router();

router.get('/auth', auth);
router.get('/callback', callback);
router.get('/userdata', login);

export default router;