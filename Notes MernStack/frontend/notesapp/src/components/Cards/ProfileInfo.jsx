import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo,onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200'>
            {getInitials(userInfo?.name)}
        </div>
     <div>
        <p className='text-base font-medium'>{userInfo?.name}</p>
        <button className='text-sm text-slate-800 underline' onClick={onLogout}>
            Logout
        </button>
     </div> 
    </div>
  )
}

export default ProfileInfo
