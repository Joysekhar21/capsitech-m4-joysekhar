import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance.js'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard.jsx'
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoNotesImg from "../../assets/images/no-notes.svg"

const Home = () => {

  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage,setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  })

  const [allNotes,setAllNotes] = useState([])

  const [userInfo,setUserInfo] = useState(null)
  const [isSearch,setIsSearch] = useState(false)
  const [showScrollButtons, setShowScrollButtons] = useState(true);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollButtons(true);
    } else {
      setShowScrollButtons(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({isShown:true, data: noteDetails, type:"edit"});
  }

  const showToastMsg = (message,type)=>{
    setShowToastMessage({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = ()=>{
    setShowToastMessage({
      isShown: false,
      message: "",
    })
  }

  // Get User Info
  const getUserInfo = async ()=>{
    try {
      const response = await axiosInstance.get("/api/user/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status===401){
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  //Get All Notes
  const getAllNotes = async ()=>{
    try {
      const response = await axiosInstance.get("/api/note/get-notes")
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again")
    }
  }

  //Delete Notes
  const deleteNote = async (data)=>{
    const noteId = data?._id
    try {
      const response = await axiosInstance.delete("/api/note/delete-note/" + noteId)

      if(response.data && !response.data.error){
        showToastMsg("Note deleted successfully 👍🏻",'delete')
        getAllNotes()
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        console.log("An unexpected error occurred. Please try again")
      }
    }
  }

  //Search Notes
  const onSearchNote = async (query)=>{
    try {
      const response = await axiosInstance.get("/api/note/search-notes",{
        params: {query}
      })
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again")
    }
  }

  //Pin Notes
  const updateIsPinned = async (noteData) =>{
          const noteId = noteData?._id
          try {
            const response = await axiosInstance.put("/api/note/update-note-pinned/" + noteId,{
              isPinned: !noteData?.isPinned
            })
    
            if(response.data && response.data.note){
              showToastMsg("Note updated 😉👍🏻")
              getAllNotes()
            }
          } catch (error) {
            console.log(error)
          }
  }

  const handleClearSearch = ()=>{
    setIsSearch(false)
    getAllNotes()
  }

  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return ()=>{};
  },[])

  return (
    <>
      <NavBar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      
      <div className='overflow-auto container mx-auto sm:px-6 lg:px-8 '>
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Your Notes</h2>
      {allNotes?.length>0?(<div className='grid grid-cols-3 gap-4 mt-8'>
        {allNotes.map((item,index)=>(
            <NoteCard 
            key={item?._id}
            title={item?.title}
            date={item?.createdOn}
            content={item?.content}
            tags={item?.tags}
            isPinned={item?.isPinned}
            onEdit={()=>handleEdit(item)}
            onDelete={()=>deleteNote(item)}
            onPinNote={()=>updateIsPinned(item)}
            />
        ))}
      
      </div>
    ):(
    <EmptyCard imgSrc={isSearch ? NoNotesImg : AddNotesImg} message={isSearch?`Oops! No notes found matching your search `:`Start Creating your first note! Click the 'Add' button`}/>
    )}
      </div>
      <button 
      className='w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-700 absolute right-10 bottom-10'
       onClick={()=>{
        setOpenAddEditModal({isShown: true,type: "add", data: null})
       }}>
        <MdAdd className='text-[32px] text-white'/>
      </button>

      
        <div className="fixed left-10 bottom-10 z-10 flex flex-col space-y-2">
          {/* Scroll to Top Button */}
          <button 
            className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 transition-all duration-300'
            onClick={scrollToTop}
            aria-label="Scroll to top">
            <MdKeyboardArrowUp className='text-[24px] text-white' />
          </button>
          
          {/* Scroll to Bottom Button */}
          <button 
            className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 transition-all duration-300'
            onClick={scrollToBottom}
            aria-label="Scroll to bottom">
            <MdKeyboardArrowDown className='text-[24px] text-white' />
          </button>
        </div>
      

      <Modal
        isOpen = {openAddEditModal.isShown}
        onRequestClose ={()=>{}}
        style={{
          overlay:{
            backgroundColor: "rgba(0,0,0,0.2)",
          }
        }}
        contentLabel = ""
        className= "w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
          <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={()=>{
            setOpenAddEditModal({isShown: false,type: "add", data: null})
          }}
          getAllNotes={getAllNotes}
          showToastMsg={showToastMsg}
          />

        </Modal>
          <Toast
          isShown={showToastMessage.isShown}
          message={showToastMessage.message}
          type={showToastMessage.type}
          onClose={handleCloseToast}
          />
         
    </>
  )
}

export default Home;