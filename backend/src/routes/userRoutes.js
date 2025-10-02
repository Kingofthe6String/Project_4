import express from "express";
import { createUser, getUser } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", getUser);

export default router;
