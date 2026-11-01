import express from "express"
import notesRouter from "./routes/notes.routes.js";


export const app = express();

app.use("/api/v1/notes",notesRouter);