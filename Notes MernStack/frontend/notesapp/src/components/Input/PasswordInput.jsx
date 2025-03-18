import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'
const PasswordInput = ({value,onChange,onBlur,name,placeholder}) => {
    const [isShowPassword,setIsShowPassword] = useState(false);
    const toggleShowPassword = ()=>{
        setIsShowPassword(!isShowPassword)
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 bg-white'>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={isShowPassword?"text":"password"}
        placeholder={placeholder|| "Password"}
        name={name}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
      />
    {isShowPassword?(<FaRegEye
    size={22}
    className="text-[#2B85FF] cursor-pointer "
    onClick={()=>toggleShowPassword()}
    />):(
        <FaRegEyeSlash
        size={22}
        className='text-slate-400 cursor-pointer'
        onClick={()=>toggleShowPassword()}
        />
    )}
    </div>
  )
}

export default PasswordInput
