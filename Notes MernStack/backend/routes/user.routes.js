import { Router } from "express";
import {registerController,loginController, getUserController} from "../controller/user.controller.js";
import userAuth from "../middleware/auth.middleware.js";


const router = Router();

router.post("/create-account",registerController)
router.post("/login",loginController)
router.get("/get-user",userAuth,getUserController)
export default router;