import React from 'react'
import AnalyzingTopic from './AnalyzingTopic'
import LoadingLine from './LoadingLine'

const bottom = () => {
const Topics = [
  "Analyzing 'Cell Division'...",
  "Creating tailored notes for Quantum Physics...",
  "Generating practice questions...",
  "Finding weak concepts...",
]



  return (
    <div className='min-h-screen w-[75vw] lg:w-[37%] md:w-[50%] overflow-hidden'>
        <LoadingLine progress={70}/>
      <AnalyzingTopic   topics={Topics} currentTopic={1}/>
    </div>
  )
}

export default bottom
