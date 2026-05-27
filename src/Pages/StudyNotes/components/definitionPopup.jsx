import {BookOpenText} from 'lucide-react';


export default function DefinitionPopup({ isOpen, onClose, word, contextText }) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-24 left-[20%] w-80 bg-[#141914] border border-[#273827] rounded-xl shadow-2xl p-4 text-xs text-gray-300 z-50 transition-all duration-200 font-sans">
     
      <div className="flex justify-between items-center pb-2 border-b border-[#222E22] mb-3 font-sans">
        <span className="text-[13px] uppercase tracking-wider text-gray-200 font-semibold">
          Definition in Context
        </span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition">
          ✕
        </button>
      </div>
      
      
      <h3 className="text-lg font-semibold text-gray-100 mb-2">{word}</h3>
      
  
      <div className="flex gap-3 items-start">
      
        <div className="w-24 h-24 bg-[#1E251E] rounded-lg overflow-hidden shrink-0 border border-[#2E3F2E] flex items-center justify-center text-3xl select-none">
         <button className='bg-[#1f2d25] p-3 rounded-xl shadow-md'>
                    <BookOpenText
                className='w-6 h-6 text-green-500 '/></button>
        </div>
        <div>
          <p className="font-semibold text-gray-200 mb-1">Definition:</p>
          <p className="text-gray-400 leading-normal text-[11px]">
            {contextText}
          </p>
        </div>
      </div>

     
    </div>
  );
}