import express from "express";
import { registerUser, loginUser, requestLoginOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/request-login-otp", requestLoginOTP);
router.post("/login", loginUser);

export default router;