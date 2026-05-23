import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function page2(props) {
  return (
    <div className='bg-[#121212] flex h-screen w-full'>
    
      <Sidebar/>
      <Navbar/>
    </div>
  )
}

export default page2
