import { Router } from "express";
import {
  getNotes,
  createNotes,
  updateNote,
  deleteNote,
  getNoteById
} from "../controllers/notes.controllers.js";

const router = Router();

router.route("/").get(getNotes).post(createNotes);

router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
