import { FeatherIcon } from 'lucide-react'
import React, { useState } from 'react'
import FeatureIcon from './FeatureCardIcon'


const FeatureCard = (props) => {

const Icons = props.icon

const [active,setActive] = useState(false)


  return (

    
    <button
    onClick={()=> setActive(!active)}
    className={`border border-[#3b7a57] h-[80%] lg:h-[88%] w-[30%] lg:w-[32%] rounded-2xl flex  flex-col 
    transition-all duration-300 cursor-pointer px-1  text-gray-300
    hover:h-[81%] hover:w-[31%]
  
    ${
        active
        ? " text-white bg-green-500/10 shadow-lg shadow-green-400/20  " 
        : "border-zinc-700 bg-[#1c1c1e]"
    }

    `}>
       <div className='mt-16 mb-6 flex justify-center'>
        <FeatureIcon icons = {Icons}/>
       </div>
        <h1 className=' text-[14px] md:text-[21px] lg:text-[28px]' >{props.title}</h1>
        <div className='mt-[1px]  text-[10px] md:px-6 md:text-[15px]'>

        <h3 className=' text-zinc-400'>{props.sub}</h3>
        </div>

    </button>
  )
}

export default FeatureCard
