


export default function MainContent({ onTermClick }) {
  return (
    <div className="flex-1 p-6 overflow-y-auto border-r border-[#1B231B] space-y-6 max-w-4xl">
      
      <div className="flex items-center justify-between border-b border-gray-400">
        <h1 className="text-gray-100 text-xl font-semibold flex items-center gap-2">
          <span className="text-sm  bg-[#152E1C] text-[#4ade80] px-2 py-0.5 rounded">Biology</span>
            Cell Division & Growth Notes
        </h1>
      </div>

    
      <div className="prose prose-invert text-[15px] leading-relaxed text-gray-300 space-y-4">
        <p>
            Cell division is a fundamental process in biology that allows organisms to grow, reproduce, and maintain their tissues. It involves the duplication of genetic material and the distribution of this material into two daughter cells. The process is tightly regulated by various cellular mechanisms to ensure proper growth and development. 
            One key aspect of cell division is the role of the{' '}  
          <span className="bg-[#152E1C] text-[#4ade80] px-1 rounded cursor-pointer hover:brightness-110">
            cell cycle
          </span>{' '}
            which consists of distinct phases: G1, S, G2, and M. During the G1 phase, the cell grows and prepares for DNA replication.
             The S phase is where DNA synthesis occurs, resulting in the duplication of the genetic material. 
             In the G2 phase, the cell continues to grow and prepares for mitosis. Finally, during the M phase, the cell undergoes mitosis,
              where the duplicated chromosomes are separated into two daughter cells.
        </p>

        <p>
            The efficiency of cell division is influenced by various factors, including the{' '}

          <span 
            onClick={() => onTermClick('chloroplasts')}
            className="bg-[#1E3F27] text-[#4ade80] px-1 rounded border border-[#2e623d] cursor-pointer font-medium hover:bg-[#254f31]"
          >
            Chloroplasts  
          </span>{' '}
            which are essential organelles in plant cells responsible for photosynthesis.
        </p>

        <h2 className="text-gray-200 text-base font-medium pt-4">chloroplasts </h2>
        <p>
            Chloroplasts are specialized organelles found in plant cells and some algae that play a crucial role in photosynthesis,
             the process by which light energy is converted into chemical energy. They contain the pigment chlorophyll, which gives plants their green color and allows them to capture light energy.
          <span className="text-[#4ade80] underline decoration-[#2e623d] underline-offset-4 cursor-pointer hover:bg-[#254f31]">
            Chloroplasts
          </span>{' '}
          or surrounding cells manifest as mutations.
        </p>
      </div>

      
      <div className="mt-8 pt-4  ">
        <input 
          type="text" 
          placeholder="Type a message or ask AI..." 
          className="w-full bg-[#141A14] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#385338] text-gray-200 placeholder-gray-400"
        />
      </div>
    </div>
  );
}