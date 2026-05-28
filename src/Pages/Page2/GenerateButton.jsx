import React from 'react'

const GenerateButton = () => {
  return (
    <div className='text-stone-50'>
      <button className='w-40 h-10 mt-10 md:mt-8 lg:mt-8 bg-green-900 rounded-lg font-semibold 
      hover:bg-green-800 cursor-pointer shadow-(--primary-color)
       hover:shadow-(--hover-color) transition-all duraion-300'>
        Generate Plan
      </button>
      
    </div>
  )
}

export default GenerateButton
