import React from 'react'

const topSec = () => {
  return (
    <div className='h-[8%] w-full flex flex-col items-center mt-6 mb-0'>
        
      <h1 className='text-white text-4xl lg:text-5xl flex lg:mb-5 items-center'>

        AI Analysis in Progress
        <span className='flex ml-1 text-[48px]'>
        <span className='animate-[blink_1.4s_infinite]'>.</span>
        <span className='animate-[blink_1.4s_infinite_0.4s] '>.</span>
        <span className='animate-[blink_1.4s_infinite_0.9s] '>.</span>

        </span>
      </h1>
    </div>
  )
}

export default topSec

