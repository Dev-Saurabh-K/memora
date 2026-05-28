import { useState, useEffect } from "react";
import Sidebar from "../../Pages/Page2/Sidebar";
import Navbar from "../Page2/Navbar";
import Card from "./Card";
import { Ellipsis } from 'lucide-react';

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [groupBy, setGroupBy] = useState('history'); 
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error("No access token found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/get/topic', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

 
  const sortedTopics = [...topics].sort((a, b) => {
    return (b.timestamp || 0) - (a.timestamp || 0);
  });


  const groupedTopics = sortedTopics.reduce((acc, topic) => {
    const groupKey = groupBy === 'subject' 
      ? (topic.subject || 'Unassigned Subject') 
      : (topic.history_group || 'General'); 

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(topic);
    return acc;
  }, {});


  const sortedGroupEntries = Object.entries(groupedTopics).sort(([, itemsA], [, itemsB]) => {
    const latestA = itemsA[0]?.timestamp || 0;
    const latestB = itemsB[0]?.timestamp || 0;
    return latestB - latestA;
  });

  return (
    <div className='h-screen bg-[#000000] text-slate-100 flex overflow-hidden font-sans '>

      <Sidebar />

      <div className='flex-1 flex flex-col min-w-0 overflow-y-auto md:pl-5 pl-8'>
        
        <Navbar/>

      
        <main className='flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto'>
          
          
          <div>
            <h1 className="text-white font-semibold text-3xl tracking-tight">
              Welcome, Saurabh!
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Advanced Dashboard & Analytics Overview
            </p>
          </div>

      
          <div className="border-t border-zinc-800/80 pt-6 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-zinc-200 text-lg font-medium tracking-wide">
                Topic Cores
              </h2>
              
             
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-zinc-800/60 rounded-lg transition-colors group focus:outline-none"
                > 
                  <Ellipsis className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors"/>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800/80 rounded-lg shadow-xl z-20 py-1 text-sm text-zinc-300">
                    <button
                      onClick={() => {
                        setGroupBy('history');
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-800/60 transition-colors ${groupBy === 'history' ? 'text-indigo-400 font-medium' : ''}`}
                    >
                      Group by History (Default)
                    </button>
                    <button
                      onClick={() => {
                        setGroupBy('subject');
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-800/60 transition-colors ${groupBy === 'subject' ? 'text-indigo-400 font-medium' : ''}`}
                    >
                      Group by Subject
                    </button>
                  </div>
                )}
              </div>
            </div>

            
            {isLoading ? (
              <div className="text-zinc-400 text-sm">Loading topics...</div>
            ) : sortedGroupEntries.length === 0 ? (
              <div className="text-zinc-500 text-sm">No topics found.</div>
            ) : (
           
              sortedGroupEntries.map(([groupId, groupItems]) => (
                <div key={groupId} className="space-y-4">
                  
                
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                      {groupBy === 'subject' ? `Subject: ${groupId}` : `History Group: ${groupId}`}
                    </h3>
                  </div>

            
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {groupItems.map((topic) => (
                      <div key={topic.id} className="transition-transform duration-200 hover:-translate-y-1">
                        <Card
                          title={topic.topic_text}
                          subtitle={topic.subject}
                          progress={0} 
                        />
                      </div>
                    ))}
                  </div>

                </div>
              ))
            )}
          </div>

        </main>
      </div>
    </div>
  );
}