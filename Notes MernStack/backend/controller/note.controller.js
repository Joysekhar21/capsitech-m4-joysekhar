import noteModel from "../models/note.model.js";

//Add Note
const addNoteController = async(req,res) =>{
    try {
        const {title,content,tags} = req.body;
        const user = req?.user;
        if(!title){
            return res.status(400).json({message: "Title is Required"})
        }
        if(!content){
            return res.status(400).json({message: "Content is Required"})
        }

        const note = new noteModel({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        })
        await note.save();
        return res.status(200).json({
            message: "Note Added Successfully",
            success: true,
            note
        })
    } catch (error) {
        console.log("Error on add Note ",error)
        return res.status(500).json({
            message:"Internal server Error during addNote",
            error
        })
    }
}

const updateNoteController = async(req,res)=>{
    try {
        const noteId = req.params.noteId;
        const {title,content,tags,isPinned} = req.body;
        const user = req?.user;
        if(!title && !content && !tags){
            return res.status(400).json({message:"No changes provided"});
        }
        const note = await noteModel.findOne({_id:noteId,userId: user._id})
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;
        await note.save();
        return res.status(200).json({
            message: "Note Update Successfully",
            success: true,
            note
        })
    } catch (error) {
        console.log("Error on update Note ",error)
        return res.status(500).json({
            message:"Internal server Error during updateNote",
            error
        })
    }
}

const getAllNoteController = async(req,res)=>{
    try {
        const user = req?.user;
        const notes = await noteModel.find({userId: user._id}).sort({isPinned: -1});
        return res.status(200).json({
            message: "All Note retrieved successfully",
            success: true,
            notes
        })
    } catch (error) {
        console.log("Error on  get all add Note ",error)
        return res.status(500).json({
            message:"Internal server Error during getAllNote",
            error
        })
    }
    
}

const deleteNoteController = async(req,res)=>{
    try {
        const noteId = req.params.noteId;
        const user = req?.user;
        const note = await noteModel.findOne({_id:noteId,userId:user._id});
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        await noteModel.deleteOne({_id:noteId,userId:user._id})
        return res.status(200).json({
            message: "Delete Note successfully",
            success: true,
        })
    } catch (error) {
        console.log("Error on delete Note ",error)
        return res.status(500).json({
            message:"Internal server Error during delete Note",
            error
        })
    }
}

const isPinnedController = async(req,res)=>{
    try {
        const noteId = req.params.noteId;
        const {isPinned} = req.body;
        const user = req?.user;
        
        const note = await noteModel.findOne({_id:noteId,userId: user._id})
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
         note.isPinned = isPinned;
        await note.save();
        return res.status(200).json({
            message: "Note Update Successfully",
            success: true,
            note
        })
    } catch (error) {
        console.log("Error on Pinned Note ",error)
        return res.status(500).json({
            message:"Internal server Error during Pinned Note",
            error
        })
    }
}

const searchController = async(req,res)=>{
    try {
        const user = req.user;
        const {query} = req.query;
        if(!query){
            return res.status(400).json({message:"Search query is required"})
        }
        const matchingNotes = await noteModel.find({
            userId: user._id,
            $or:[
                {title : {$regex: new RegExp(query, "i")}},
                {content : {$regex: new RegExp(query, "i")}}
            ]
        })
        return res.status(200).json({
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully"
        })
    } catch (error) {
        console.log("Error on Search Note ",error)
        return res.status(500).json({
            message:"Internal server Error during Search Note",
            error
        })
    }
}

export {addNoteController,updateNoteController,getAllNoteController,deleteNoteController,isPinnedController,searchController}