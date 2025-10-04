import Question from "../models/Question.js";

// GET all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
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

// POST add answer to a question
export const answerQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Add answer to the answers array (no userId needed)
    question.answers.push({
      body,
      createdAt: new Date(),
    });

    // Mark question as answered
    question.answered = true;

    await question.save();

    res.status(201).json(question);
  } catch (err) {
    console.error("Error adding answer:", err);
    res.status(400).json({ message: err.message });
  }
};
// GET single question by ID with all answers
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
