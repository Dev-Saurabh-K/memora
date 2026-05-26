import React from 'react'
import FeatureCard from './FeatureCard'
import {FileText,List,Keyboard} from 'lucide-react'

const centerSec = () => {
  const content = [
    {
      Title: "Upload PDF",
      subtext: "Drop your textbook or reference material here. Our AI will scan the chapters, extract key concepts.",
      Icon: FileText
    },
    {
      Title: "Upload Syllabus",
      subtext:"Upload your course syllabus or curriculum outline. The platform will automatically map out a timeline.",
      Icon: List
    },
    {
      Title: "Add Topics Manually",
      subtext: "Prefer a personalized approach? Type your thoughts...",
      Icon: Keyboard
    }
  ]
  return (
    <div className='h-[55vh] w-full bg-[#1c1c1e] border border-zinc-800 mt-3 lg:mt-10 rounded-2xl flex flex-row gap-4 items-center justify-center'>
     {content.map((e)=>{
      return(

        <FeatureCard title={e.Title} sub={e.subtext} icon={e.Icon}/>
      )
       })}
  
    </div>
  )
}

export default centerSec
