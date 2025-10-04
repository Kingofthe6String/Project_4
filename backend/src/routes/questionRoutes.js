import express from "express";
import {
  createQuestion,
  getQuestions,
  answerQuestion,
  getQuestionById,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", createQuestion);
router.post("/:id/answers", answerQuestion);

export default router;
