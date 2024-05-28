import { Router } from "express";
import { getUserByAuth, getUserForDesktop, verifyToken } from "../../controllers/auth/user.controller.js";


const router = Router();

router.post("/login", getUserByAuth);
router.get("/verifyuser", verifyToken);

export default router;