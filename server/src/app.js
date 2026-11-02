import express from "express";
import notesRouter from "./routes/notes.routes.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();

app.use(express.json());
app.use(rateLimiter)

app.use("/api/v1/notes", notesRouter);

export { app };
