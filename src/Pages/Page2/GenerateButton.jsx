import React from 'react'

const GenerateButton = () => {
  return (
    <div className=''>
      <button className='w-40 h-10 mt-10 md:mt-8 lg:mt-8 bg-(--primary-color) rounded-lg font-semibold 
      hover:bg-(--hover-color) cursor-pointer shadow-(--primary-color)
       hover:shadow-(--hover-color) transition-all duraion-300'>
        Generate Plan
      </button>
      
    </div>
  )
}

export default GenerateButton
