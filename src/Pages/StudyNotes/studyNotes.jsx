import { useState, useEffect } from "react";
import Sidebar from "../../Pages/Page2/Sidebar";
import Topbar from "./components/Topbar";
import MainContent from "./components/Maincontent";
import QuizSidebar from "./components/QuizsideBar";
import DefinitionPopup from "./components/definitionPopup";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function StudyNotes() {
  const [popupState, setPopupState] = useState({
    isOpen: false,
    selectedWord: "",
    contextText: "",
  });

  const location = useLocation();
  const hg = location.state?.hg;
  const topic = location.state?.topic;
  const subject = location.state?.subject;
  
  const [notesData, setNotesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isQuizOpen, setIsQuizOpen] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(""); 

        const token = localStorage.getItem("access_token");
        const requestConfig = {
          params: {
            topic: topic,
            subject: subject,
            history_group: hg,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let response;

        try {
          // 1. Attempt to pull existing notes
          console.log("Checking retrieval endpoint...");
          response = await axios.post(
            "http://localhost:8000/api/retrieve/notes",
            {},
            requestConfig
          );
        } catch (retrieveErr) {
          // 2. Fall back to generation endpoint if missing
          console.warn("Notes missing. Falling back to generator sequence...");
          response = await axios.post(
            "http://localhost:8000/api/generate/notes",
            {},
            requestConfig
          );
        }

        console.log("Notes API payload received:", response.data);
        setNotesData(response.data);
      } catch (err) {
        console.error("Critical: Both endpoints failed to resolve:", err);
        setError("Failed to load notes from server.");
      } finally {
        setLoading(false);
      }
    };

    // FIX: Fallback condition prevents infinite loading if props are absent
    if (topic && subject && hg) {
      fetchNotes();
    } else {
      setLoading(false);
      setError("Missing route parameters (Topic, Subject, or History Group).");
    }
  }, [topic, subject, hg]);

  const handleTermSelection = (word) => {
    setPopupState({
      isOpen: true,
      selectedWord: word,
      contextText:
        "A chloroplast is a specialized organelle found in plant cells and algae that converts sunlight into chemical energy through photosynthesis.",
    });
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-black text-white flex font-sans">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-150px] right-[-120px] w-[350px] h-[350px] bg-green-400/10 blur-[140px] rounded-full" />
      </div>

      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex w-64 flex-shrink-0 border-r border-white/10 bg-[#050505]/95 backdrop-blur-xl z-20">
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* TOPBAR */}
        <div className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-4">
            <Topbar
              isQuizOpen={isQuizOpen}
              onToggleQuiz={() => setIsQuizOpen(!isQuizOpen)}
            />

            {/* QUIZ TOGGLE BUTTON */}
            <button
              onClick={() => setIsQuizOpen(!isQuizOpen)}
              className="
                hidden lg:flex
                items-center gap-2
                px-4 py-2
                rounded-xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                transition-all duration-300
                text-sm
                font-medium
              "
            >
              {isQuizOpen ? (
                <>
                  <PanelRightClose size={18} />
                  Hide Quiz
                </>
              ) : (
                <>
                  <PanelRightOpen size={18} />
                  Show Quiz
                </>
              )}
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-5xl mx-auto">
              
              {/* HEADER - Updated to display dynamic title parameters */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight capitalize">
                  {topic ? `${topic} Notes` : "Study Notes"}
                </h1>
                <p className="text-zinc-400 mt-3 text-base leading-relaxed max-w-2xl">
                  Interactive AI-powered study notes with quizzes, keyword definitions, and immersive reading experience.
                </p>
              </div>

              {/* READING CARD */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-[#0A0A0A]/90
                  shadow-[0_0_60px_rgba(0,255,120,0.05)]
                  backdrop-blur-2xl
                "
              >
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600" />

                <div className="p-6 sm:p-8 lg:p-10">
                  {loading ? (
                    <div className="text-zinc-400 animate-pulse">
                      Generating AI Notes...
                    </div>
                  ) : error ? (
                    <div className="text-red-400 font-medium">{error}</div>
                  ) : (
                    /* FIX: Added missing dynamic props needed by your updated MainContent component */
                    <MainContent
                      onTermClick={handleTermSelection}
                      data={notesData}
                      subject={subject}
                      topic={topic}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* QUIZ SIDEBAR */}
          <aside
            className={`
              hidden lg:flex
              flex-col
              absolute right-0 top-0 h-full
              bg-[#050505]/95
              backdrop-blur-2xl
              border-l border-white/10
              transition-all duration-500 ease-out
              w-[360px]
              z-30
              shadow-[-10px_0_40px_rgba(0,0,0,0.5)]
              ${isQuizOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
            `}
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">Quiz Section</h2>
                <p className="text-xs text-zinc-500 mt-1">Test your understanding</p>
              </div>
              <button
                onClick={() => setIsQuizOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <PanelRightClose size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <QuizSidebar />
            </div>
          </aside>

          {/* OVERLAY */}
          {isQuizOpen && (
            <div
              onClick={() => setIsQuizOpen(false)}
              className="hidden lg:block absolute inset-0 bg-black/50 backdrop-blur-[2px] z-20 transition-all duration-300"
            />
          )}

          {/* POPUP */}
          <DefinitionPopup
            isOpen={popupState.isOpen}
            word={popupState.selectedWord}
            contextText={popupState.contextText}
            onClose={() => setPopupState((prev) => ({ ...prev, isOpen: false }))}
          />
        </div>
      </div>
    </div>
  );
}