
import { useState } from 'react';
import Sidebar from '../../Pages/Page2/Sidebar';
import Topbar from './components/Topbar';
import MainContent from './components/Maincontent';
import QuizSidebar from './components/QuizSidebar';
import DefinitionPopup from './components/DefinitionPopup';

export default function StudyNotes() {
  const [popupState, setPopupState] = useState({
    isOpen: false, 
    selectedWord: '',
    contextText: ''
  });

  const handleTermSelection = (word) => {
    setPopupState({
      isOpen: true,
      selectedWord: word,
      contextText: `A chloroplast is a specialized organelle found in plant cells and algae that converts sunlight into chemical energy through the process of photosynthesis.`
    });
  };

  return (
    <div className="h-screen bg-[#0A0E0A] text-gray-300 flex overflow-hidden font-sans antialiased">
     
      <Sidebar />

      
      <div className="flex-1 flex flex-col min-w-0">
        
        <Topbar />

        
        <div className="flex-1 flex overflow-hidden relative">
          
          
          <MainContent onTermClick={handleTermSelection} />

         
          <QuizSidebar />

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

    