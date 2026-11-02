import { Note } from "../models/note.models.js";
import ApiResponse from "../middlewares/ApiResponse.js";

async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res
      .status(200)
      .json(new ApiResponse(200, "Fetched the Notes from Database", notes));
  } catch (error) {
    console.error("Error while Fetching the Notes", error);
    res
      .status(500)
      .json({ message: "Internal server Error while fetching Notes" });
  }
}

async function getNoteById(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "ID not provided by the user" });
      return;
    }

    const note = await Note.findById(id);

    if (!note) {
      res.status(400).json({ message: "Wrong ID provided by the User" });
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Fetched Note successfully", note));
  } catch (error) {
    console.error("Error while fetching the note", error.message);
    res.status(500).json({ message: "Server Error while fetching the note" });
  }
}

async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    const note = await Note.create({ title, content });

    if (!note) {
      console.log("Note not created");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Note created Successfully", note));
  } catch (error) {
    console.error("Something went wrong while creating the note", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          400,
          "Something went wrong while creating the note",
          error,
        ),
      );
  }
}

async function updateNote(req, res, next) {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    if ([title, content, id].some((feild) => feild.trim() === "")) {
      console.log("Empty Update feilds");
      return;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { returnDocument: "after" },
    );

    if (!updatedNote) {
      console.log("Something went wrong while updating the note");
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Updated Successfully", updatedNote));
  } catch (error) {
    console.error("Error While Updating Notes", error);
    res
      .status(400)
      .json({ message: "Something went Wrong while updating the Note" });
  }
}

async function deleteNote(req, res) {
  try {
    const id = req.params?.id;

    if (!id) {
      console.error("No Id provided by deletion");
      return;
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      console.log("Something went wrong while deleting the note");
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Note deleted Successfully", note));
  } catch (error) {
    console.error("Error while deleting Note", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting note" });
  }
}

export { getNotes, createNotes, updateNote, deleteNote, getNoteById };
