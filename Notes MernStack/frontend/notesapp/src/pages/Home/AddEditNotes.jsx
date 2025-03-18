import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({noteData,type,getAllNotes,onClose,showToastMsg}) => {

    const [title,setTitle] = useState(noteData?.title || "")
    const [content,setContent] = useState(noteData?.content || "")
    const [tags,setTags] = useState(noteData?.tags || [])
    const [error,setError] = useState(null)

    // Add Note
    const addNewNote = async ()=>{
      try {
        const response = await axiosInstance.post("/api/note/add-notes",{
          title,
          content,
          tags,
        })

        if(response.data && response.data.note){
          showToastMsg("Note Added 😄")
          getAllNotes()
          onClose()
        }
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }
      }
    };
    // Edit Note
    const editNote = async ()=>{
      const noteId = noteData?._id
      try {
        const response = await axiosInstance.patch("/api/note/update-notes/" + noteId,{
          title,
          content,
          tags,
        })

        if(response.data && response.data.note){
          showToastMsg("Note updated 😉👍🏻")
          getAllNotes()
          onClose()
        }
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }
      }
    };

    const handleAddNote = ()=>{
        if(!title){
            setError("Please enter the title")
            return;
        }
        if(!content){
            setError("Please enter the content")
            return;
        }
        setError("")

        if(type=== "edit"){
            editNote()
        }
        else{
            addNewNote()
        }
    }
  return (
    <div className='relative'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 ' onClick={onClose}>
            <MdClose className='text-xl text-slate-500'/>
        </button>
      <div className='flex flex-col gap-2'>
        <label className='text-xs text-slate-500'>TITLE</label>
        <input
            type='text'
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go To Gym At 5'
            value={title}
            onChange={({target})=>setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='text-xs text-slate-500'>CONTENT</label>
        <textarea 
            type="text"
            className='text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded'
            placeholder='Content'
            rows={10}
            value={content}
            onChange={({target})=>setContent(target.value)}
        />
        
      </div>
      <div className='mt-3'>
        <label className='text-xs text-slate-500'>TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
      {error && <p className='text-red-600 text-xs pt-4'>{error}</p>}
      <button className='w-full text-sm bg-[#2B85FF] text-white rounded my-1 hover:bg-blue-600 font-medium mt-5 p-3' onClick={handleAddNote}>
        {type === "edit"? "UPDATE":"ADD"}
      </button>
    </div>
  )
}

export default AddEditNotes
