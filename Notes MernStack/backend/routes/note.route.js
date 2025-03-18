import { Router } from "express";
import { addNoteController, deleteNoteController, getAllNoteController, isPinnedController, searchController, updateNoteController } from "../controller/note.controller.js";
import userAuth from "../middleware/auth.middleware.js";

const router = Router();

//Create notes
router.post("/add-notes",userAuth,addNoteController);
//Update notes
router.patch("/update-notes/:noteId",userAuth,updateNoteController);
//Read notes
router.get("/get-notes",userAuth,getAllNoteController);
//Delete notes
router.delete("/delete-note/:noteId",userAuth,deleteNoteController);
// Update isPinned value
router.put("/update-note-pinned/:noteId",userAuth,isPinnedController)

//Search notes
router.get("/search-notes",userAuth,searchController);
export default router;