import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className=' flex items-center py-2 px-[4%] justify-between'>
        <img 
            src={assets.logo} 
            className='w-[max(10%,80px)]'
            alt={'logo'}
        />
        <button onClick={()=>setToken('')} className=' bg-gray-800 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default NavBar