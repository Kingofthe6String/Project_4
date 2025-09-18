import { response } from "express";
import express from "express";
import noteRoutes from "../routes/noteRoutes.js";

app.use("/api/notes", noteRoutes);

const app = express();

app.listen(5001, () => {
  console.log("server started on port 5001");
});
