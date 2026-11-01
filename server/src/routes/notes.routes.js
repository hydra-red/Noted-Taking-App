import { Router } from "express";
import {getNotes} from "../controllers/notes.controllers.js" 

const router = Router();

router.get("/",getNotes)

export default router
