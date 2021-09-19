import {Router} from "express";
import {auth, oAuthReturnRoute} from "../handlers/gitHubOAuthHandler";

const router = Router();

router.get('/auth', auth);
router.get('/callback', oAuthReturnRoute);

export default router;