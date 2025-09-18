import { response } from "express";
import express from "express";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).send("you got 5 notes");
});

app.post("/api/notes", (req, res) => {
  res.status(200).json({ message: "note created successfully" });
});

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "note update success" });
});

app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "note delete success" });
});
app.listen(5001, () => {
  console.log("server started on port 5001");
});
