import React from 'react'
import BrainCompo from './BrainCompo'
import Bottom from './bottom'
import TaskProgressBar from './TaskProgressBar'


const page3 = () => {
  return (
    <div className='w-screen bg-black min-h-screen text-white flex flex-col items-center px-60'>
      <BrainCompo/>
      <TaskProgressBar/>
    </div>
  )
}

export default page3
