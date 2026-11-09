import dotenv from "dotenv"
import express from "express";
import notesRouter from "./routes/notes.routes.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";
import path from "path"

dotenv.config()
const app = express();

const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
app.use(
  cors({
    origin:"http://localhost:5173",
  }),
)
};

app.use(express.json());
app.use(rateLimiter);



app.use("/api/v1/notes", notesRouter);

if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"../client/dist")))

app.get("/{*path}",(req,res)=>{
  res.sendFile(path.join(__dirname,"../client","dist","index.html"));
})
}

export { app };
