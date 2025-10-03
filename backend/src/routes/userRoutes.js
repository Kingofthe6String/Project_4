import express from "express";
import { registerUser } from "../controllers/userControllers.js";
import { loginUser } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
