import {BookOpenText,EllipsisVertical,ListMinus} from 'lucide-react';
import Progress from './Progress';
import Button from '@mui/material/Button';
import LearningBtn from './LearningBtn';



export default function Card({ title, subtitle, progress }) {
    return (
        <div className='bg-[#1e1e1e] hover:border hover:border-green-600 group hover:bg-[#1f2d25] rounded-lg p-4 text-white w-70 h-auto mt-4 shadow-md '>
           
            <div>
                <div className='flex items-center gap-3 h-auto shadow-md'>
                <button className='bg-[#1f2d25] p-3 rounded-xl shadow-md'>
                    <BookOpenText
                className='w-6 h-6 text-green-500 '/></button>
                 <p className='text-lg'> Cell Division</p>
                   
                  
                 <button className='ml-auto '>
                    <EllipsisVertical className='w-6 h-6 text-gray-400'/> 
                 </button>
                

                </div>
                
                <div className='flex items-center gap-3 h-auto '>
                 <button className=' p-3 mt-2'>
                    <ListMinus className='w-6 h-6 text-gray-400'/></button>
                <p className='text-gray-400 '>Ai generated</p>
                </div>
         

         <div className='relative group mt-4 '>

          <div className='group-hover:hidden'>
            <Progress />
         </div>

       
        <div className='hidden group-hover:block ml-5 '>
            <LearningBtn />
        </div>
        
        </div>

        </div>
           
        </div>
    )
}