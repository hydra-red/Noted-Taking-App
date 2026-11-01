import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { connect } from "mongoose";

dotenv.config({
  path: "./.env",
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api/v1/notes`);
  });
}).catch(error=>console.log("Database Error",error))
const port = process.env.PORT;
