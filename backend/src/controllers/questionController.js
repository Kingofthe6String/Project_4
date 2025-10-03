import Question from "../models/question.js";

// GET all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("category");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST create question
export const createQuestion = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const question = await Question.create({ title, body, category });
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update question with an answer
export const answerQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const question = await Question.findByIdAndUpdate(
      id,
      { answer, answered: true },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
