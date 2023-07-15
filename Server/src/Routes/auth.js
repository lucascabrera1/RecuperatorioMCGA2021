import { Router } from "express";
import auth from "../Controllers/auth.js"
import verifyToken from "../Controllers/verifyToken.js";

const router = Router()

router.post('/signin', auth.SignIn)
router.get('/me', verifyToken, auth.Me)


export default router