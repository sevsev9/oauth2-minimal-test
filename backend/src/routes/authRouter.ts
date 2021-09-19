import {Router} from "express";
import {oAuthLogin as gitHubLogin} from "../handlers/gitHubOAuthHandler";
const router = Router();

router.get('/github', gitHubLogin);
router.get('/google', gitHubLogin);

export default router;