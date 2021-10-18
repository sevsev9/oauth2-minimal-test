import {Router} from "express"
import {authCallback, login, startAuth} from "../handlers/googleOAuthHandler";

const router = Router();

router.get('/auth', startAuth);
router.get('/callback', authCallback);
router.get('/userdata', login)

export default router;