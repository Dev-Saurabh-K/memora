import React from 'react'
import { Bell } from 'lucide-react'

const BellNav = () => {
  return (
    <div className='flex'>
      <button className='cursor-pointer hover:scale-120 transition duration-300'>
        <Bell color='gray'/>
        </button>
    </div>
  )
}

export default BellNav
