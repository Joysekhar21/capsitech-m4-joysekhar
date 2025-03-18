import React from 'react'
import {MdCreate, MdDelete, MdOutlinePushPin} from "react-icons/md"
import moment from 'moment'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
    
  return (
   
    <div className='border rounded p-4 bg-slate-100 hover:shadow-xl transition-all ease-in-out border-gray-500'>
      <div className='flex items-center justify-between'>
        <div>
            <h6 className='text-base font-medium'>{title}</h6>
            <span className='text-xs text-slate-900'>{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin className={`text-xl cursor-pointer hover:text-[#2B85FF] ${isPinned?'text-[#2B85FF]':'text-slate-400'}`} onClick={onPinNote}/>
      </div>
      <p className='text-base text-slate-900 mt-2'>{content?.slice(0,60)}</p>
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-600'>{tags.map((item)=>`#${item} `)}</div>
        <div className='flex items-center gap-2'>
            <MdCreate
             className='icon-btn hover:text-green-600'
              onClick={onEdit}/>
            <MdDelete
             className='icon-btn hover:text-red-500'
             onClick={onDelete}
             />

        </div>
      </div>
    </div>
  )
}

export default NoteCard