import React from 'react'
import {SiCodechef} from 'react-icons/si'
const Header = () => {
  return (
    <div className="flex justify-center items-center bg-teal-500 text-white text-2xl h-16 rounded-sm">
        <div className='text-2xl font-bold'
        >
          <SiCodechef className='inline-block text-5xl'/>
        </div>
        <div className='text-2xl font-bold'>
          Vee Recipe's 
        </div>
    </div>

  )
}

export default Header