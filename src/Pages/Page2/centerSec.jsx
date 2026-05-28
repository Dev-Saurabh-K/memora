import { useState } from 'react';
import FeatureCard from './FeatureCard';
import { FileText, Keyboard } from 'lucide-react';

const CenterSec = () => {
 
  const [selectedId, setSelectedId] = useState(null);

  const content = [
    {
      id: "upload", 
      title: "Upload PDF/Syllabus",
      subtext: "Drop your textbook or reference material here. Our AI will scan chapters and extract key concepts instantly.",
      icon: FileText
    },
    {
      id: "manual", 
      title: "Add Topics Manually",
      subtext: "Prefer a personalized approach? Type your thoughts, paste rough notes, or outline your custom study goals.",
      icon: Keyboard
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto font-sans">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
          Ask AI
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-sm mx-auto">
          Choose how you want to provide source material to your AI study companion.
        </p>
      </div>

      <div className="w-full bg-[#131313] border border-zinc-800/60 flex flex-col md:flex-row items-stretch justify-center gap-4 p-5 rounded-2xl shadow-xl">
        {content.map((item) => (
          <div key={item.id} className="flex-1 flex">
            
            <FeatureCard 
              title={item.title} 
              sub={item.subtext} 
              icon={item.icon}
              isActive={selectedId === item.id} 
              onClick={() => setSelectedId(item.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterSec;