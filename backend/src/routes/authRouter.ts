import {Router} from "express";
import {login as gitHubLogin} from "../handlers/gitHubOAuthHandler";
const router = Router();

router.get('/github', gitHubLogin);
router.get('/google', gitHubLogin);

export default router;