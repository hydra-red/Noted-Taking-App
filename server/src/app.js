import dotenv from "dotenv"
import express from "express";
import notesRouter from "./routes/notes.routes.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";

dotenv.config()
const app = express();

app.use(
  cors({
    origin:"http://localhost:5173",
  }),
);
app.use(express.json());
app.use(rateLimiter);


app.use("/api/v1/notes", notesRouter);

export { app };
