import { response } from "express";
import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log("server started on port 5001", PORT);
});
