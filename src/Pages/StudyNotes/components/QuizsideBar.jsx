

export default function QuizSidebar() {
  return (
    <div className="w-80 bg-[#0E130E] p-4 flex flex-col justify-between overflow-y-auto border-l border-[#1B231B] font-sans">
      <div>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-200 text-sm font-semibold tracking-wide">Dynamic Assessment Quiz</h3>
          <button className="text-gray-500 hover:text-gray-300 text-lg">⋮</button>
        </div>

        
        <div className="space-y-2 mb-6">
          <div className="bg-[#152519] border border-[#27442E] rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-[#192E1F] transition">
            <div className="bg-[#1D3524] text-[#4ade80] p-2 rounded-md text-xs">📋</div>
            <div>
              <h4 className="text-xs font-medium text-gray-200">Plant Biology (Topic Quiz)</h4>
              <p className="text-[10px] text-gray-500">Plant Biology Topic Quiz</p>
            </div>
          </div>

          <div className="bg-[#121812] border border-[#1B251B] rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-[#172017] transition opacity-60">
            <div className="bg-[#1A221A] text-gray-400 p-2 rounded-md text-xs">🔒</div>
            <div>
              <h4 className="text-xs font-medium text-gray-400">Full Comprehensive Exam</h4>
              <p className="text-[10px] text-gray-600">Comprehensive assessment exam</p>
            </div>
          </div>
        </div>

        
        <div className="text-center text-[10px] text-gray-600 my-4 flex items-center justify-center gap-2 select-none">
          <div className="h-[1px] bg-[#1B231B] flex-1"></div> OR <div className="h-[1px] bg-[#1B231B] flex-1"></div>
        </div>

        
        <div className="bg-[#121812] border border-[#1B251B] rounded-lg p-4 space-y-3">
          <p className="text-xs text-gray-300 font-medium">What is the primary function of chloroplasts?</p>
          <div className="space-y-2 text-[11px]">
            {['Energize a drive of chlorophyll', 'Support of cell rigidity', 'Storage of basic acids'].map((option, index) => (
              <label key={index} className="flex items-center gap-2 p-2 rounded border border-[#1B251B] hover:bg-[#161F16] cursor-pointer transition">
                <input type="radio" name="quiz" className="accent-[#4ade80]" />
                <span className="text-gray-400">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      
      <div className="mt-6 pt-4 border-t border-[#1B231B] space-y-3 text-[10px] text-gray-500">
        <div>
          <div className="flex justify-between mb-1">
            <span>Document assimilation</span>
            <span className="text-[#4ade80]">64%</span>
          </div>
          <div className="w-full bg-[#1B231B] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4ade80] h-full w-[64%]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Crucial quotation</span>
            <span className="text-[#4ade80]">30%</span>
          </div>
          <div className="w-full bg-[#1B231B] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4ade80] h-full w-[30%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}