import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You just fetched the notes");
});
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
