import React from 'react'
import BrainCompo from './BrainCompo'
import TopSec from './topSec'
import Bottom from './bottom'


const page3 = () => {
  return (
    <div className='w-screen bg-black min-h-screen text-white flex flex-col items-center'>
        <TopSec/>
      <BrainCompo/>
      <Bottom/>
    </div>
  )
}

export default page3
