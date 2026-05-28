import { useState, useRef } from 'react'; 
import FeatureCard from './FeatureCard';
import { FileText, Keyboard, UploadCloud } from 'lucide-react';
import GenerateButton from "./GenerateButton";

const CenterSec = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [textInput, setTextInput] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null); 
  const ACCESS_TOKEN = localStorage.getItem("access_token");
  console.log(ACCESS_TOKEN);

  const content = [
    {
      id: "upload", 
      title: "Upload PDF/Syllabus",
      icon: FileText
    },
    {
      id: "manual", 
      title: "Add Topics Manually",
      icon: Keyboard
    }
  ];

  const handleUploadContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File uploaded successfully:", file.name);
    }
  };
  
  const handleGenerate = async () => {
    if (selectedId === 'upload') {
      if (!selectedFile) {
        alert("Please select a file first!");
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        console.log("Uploading file to backend...");
        const response = await fetch('http://localhost:8000/api/generate/syllabus', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success! Received plan:", data.plan);

      } catch (error) {
        console.error("Failed to upload file to backend:", error);
        alert("An error occurred while processing the file.");
      }
      
    } else if (selectedId === 'manual') {
      if (!textInput.trim()) {
        alert("Please enter your topic details first!");
        return;
      }

      try {
        console.log("Triggering Event: Submitting manual text to backend...");
        
        const response = await fetch('http://localhost:8000/api/generate/addtopic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            topic: textInput,
            subject: "General" 
          })
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success! Received Topic Plan:", data);
        
        // Optional: Clear the input text box upon successful submission
        // setTextInput(""); 

      } catch (error) {
        console.error("Failed to submit manual topic to backend:", error);
        alert("An error occurred while submitting your topic.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto font-sans ">
  
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
              icon={item.icon}
              isActive={selectedId === item.id} 
              onClick={() => setSelectedId(item.id)} 
            />
          </div>
        ))}
      </div>

      <div className="w-full mt-6 transition-all duration-300 ease-in-out">
        {selectedId === "upload" && (
          <div 
            onClick={handleUploadContainerClick} 
            className="w-full p-8 border border-dashed border-zinc-800 bg-[#161618]/50 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-emerald-600/50 transition-colors cursor-pointer"
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.txt,.docx"
              className="hidden"
            />
            <UploadCloud className="w-10 h-10 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            <p className="text-sm text-zinc-300 font-medium">
              {selectedFile ? `Selected: ${selectedFile.name}` : "Click to upload or drag & drop your file here"}
            </p>
            <p className="text-xs text-zinc-500">PDF up to 10MB</p>
          </div>
        )}

        {selectedId === "manual" && (
          <div className="w-full">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste your syllabus chapters, exam topics, or raw textbook notes here..."
              className="w-full h-36 p-4 bg-[#161618] border border-zinc-800 rounded-2xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-600 transition-colors resize-none text-sm"
            />
          </div>
        )}
      </div>

      <div className="mt-6 w-full flex justify-end">
        <GenerateButton 
          disabled={!selectedId || (selectedId === 'upload' && !selectedFile) || (selectedId === 'manual' && !textInput.trim())} 
          onClick={handleGenerate}
          currentSelection={selectedId}
        />
      </div>
    </div>
  );
};

export default CenterSec;