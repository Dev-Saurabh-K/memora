import { useState } from 'react';
import Sidebar from '../../Pages/Page2/Sidebar';
import Topbar from './components/Topbar';
import MainContent from './components/Maincontent';
import QuizSidebar from './components/QuizsideBar';
import DefinitionPopup from './components/definitionPopup';

export default function StudyNotes() {
  const [popupState, setPopupState] = useState({
    isOpen: false, 
    selectedWord: '',
    contextText: ''
  });
  
  // UX Improvement: Allow users to toggle the quiz panel for a "Focus Mode"
  const [isQuizOpen, setIsQuizOpen] = useState(true);

  const handleTermSelection = (word) => {
    setPopupState({
      isOpen: true,
      selectedWord: word,
      contextText: `A chloroplast is a specialized organelle found in plant cells and algae that converts sunlight into chemical energy through the process of photosynthesis.`
    });
  };

  return (
    <div className="h-screen bg-[#070A07] text-slate-200 flex overflow-hidden font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Sidebar: Subtly darker background for depth, hidden on mobile */}
      <div className="hidden md:flex flex-shrink-0 border-r border-emerald-950/30 bg-[#040604]">
        <Sidebar />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0E0A]">
        
        {/* Pass toggle states to Topbar so users can hide/show the Quiz */}
        <Topbar isQuizOpen={isQuizOpen} onToggleQuiz={() => setIsQuizOpen(!isQuizOpen)} />

        {/* Workspace Body */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Main Reading Content: Constrained width for reading comfort, smooth scrolling */}
          <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 lg:px-16 scrollbar-thin scrollbar-thumb-emerald-950/50 scrollbar-track-transparent">
            <div className="max-w-3xl mx-auto w-full space-y-6">
              <MainContent onTermClick={handleTermSelection} />
            </div>
          </main>

          {/* Quiz Sidebar: Smooth sliding transition & clear boundary */}
          <aside className={`transform transition-all duration-300 ease-in-out border-l border-emerald-950/30 bg-[#050705] overflow-y-auto flex-shrink-0 hidden lg:block
            ${isQuizOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none border-l-0'}`}>
            <QuizSidebar />
          </aside>

          {/* Definition Popup: Fixed/Absolute overlay with backdrop-blur */}
          <DefinitionPopup 
            isOpen={popupState.isOpen}
            word={popupState.selectedWord}
            contextText={popupState.contextText}
            onClose={() => setPopupState(prev => ({ ...prev, isOpen: false }))}
          />

        </div>
      </div>
    </div>
  );
}