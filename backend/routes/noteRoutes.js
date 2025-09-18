import express from "express";
import { getAllNotes } from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", (req, res) => {
  res.status(200).json({ message: "note created successfully" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "note update success" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "note delete success" });
});

export default router;
