
import { BookOpenText, EllipsisVertical, ListMinus } from 'lucide-react';
import Progress from './Progress';
import Button from '@mui/material/Button';
import LearningBtn from './LearningBtn';

export default function Card({ title, subtitle, progress }) {
  return (
    <div className="
      w-full bg-[#161617] 
      border border-transparent hover:border-emerald-500/40 
      hover:bg-[#131f18] rounded-xl p-5 text-white 
      shadow-lg transition-all duration-300 group flex flex-col justify-between h-52
    ">
      
      
      <div>
        <div className="flex items-center gap-3">
          <div className="bg-[#1b2b21] p-2.5 rounded-lg border border-emerald-500/20 shadow-inner">
            <BookOpenText className="w-5 h-5 text-emerald-400" />
          </div>
          
         
          <h3 className="text-base font-medium tracking-wide truncate max-w-[160px]">
            {title}
          </h3>
          
          <button className="ml-auto p-1.5 hover:bg-zinc-800/60 rounded-lg transition-colors text-zinc-400 hover:text-zinc-200">
            <EllipsisVertical className="w-5 h-5" /> 
          </button>
        </div>
        
        
        <div className="flex items-center gap-2 mt-3 pl-1 text-zinc-400">
          <ListMinus className="w-4 h-4 text-zinc-500" />
          
          <span className="text-xs font-light tracking-wide">{subtitle}</span>
        </div>
      </div>

     
      <div className="relative mt-auto pt-4 h-12 flex items-center">
  
        <div className="w-full transition-opacity duration-200 group-hover:opacity-0 group-hover:pointer-events-none">
          
          <Progress value={progress} />
        </div>

        
        <div className="absolute inset-0 top-3 w-full opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 flex items-center justify-start pointer-events-none group-hover:pointer-events-auto">
          <LearningBtn />
        </div>
      </div>
      
    </div>
  );
}