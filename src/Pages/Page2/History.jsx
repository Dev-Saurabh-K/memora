import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const limit = 3;

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get/history?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [limit]);

  return (
    <div className="max-w-2xl mx-auto w-full text-stone-50 font-sans px-4 py-6">
      
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-stone-100">History</h2>
        <p className="text-sm text-stone-400 mt-1">Your recently reviewed topics</p>
      </div>

      <Link to="/analytics">
      <button 
      className={`text-stone-50 w-40 h-10 mt-10 md:mt-8 lg:mt-8
         bg-green-900 rounded-lg font-semibold shadow-(--primary-color) hover:shadow-(--hover-color)
          transition-all duration-300 `}
          >
      Analytics
    </button>
    </Link>
        

      <div className="flex flex-col gap-3">
        {isLoading ? (
          
          [...Array(limit)].map((_, index) => (
            <div 
              key={index} 
              className="w-full h-24 bg-stone-900/50 border border-stone-800 rounded-xl animate-pulse" 
            />
          ))
        ) : data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id || item._id}
              
              className="group relative w-full p-5 border border-stone-800 bg-stone-900/40 rounded-xl flex flex-col justify-between items-start gap-4 hover:border-stone-600 hover:bg-stone-900 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99]"
            >
              
              <div className="text-lg font-medium text-stone-200 group-hover:text-stone-50 transition-colors duration-200 pr-12 line-clamp-2">
                {item.topic_text}
              </div>

              
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-800 text-stone-400 border border-stone-700 uppercase tracking-wider group-hover:border-stone-500 transition-colors">
                {item.subject}
              </span>
              
             
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-600 group-hover:text-stone-400 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-stone-800 rounded-xl bg-stone-900/10">
            <p className="text-stone-400 font-medium">No history records found.</p>
            <p className="text-xs text-stone-500 mt-1">Your activity will appear here once you start exploring.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;