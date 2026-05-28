import { useState, useEffect } from 'react';

import {
  Search,
  SlidersHorizontal,
  BookOpen,
  Hash,
  Layers,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';

import Navbar from "../Page2/Navbar";
import Sidebar from "../Page2/Sidebar";

export default function HistoryPage() {

  const [historyData, setHistoryData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {

    const controller = new AbortController();

    const fetchHistory = async () => {

      setLoading(true);

      try {

        const token = localStorage.getItem('access_token');

        if (!token) {
          throw new Error("Authentication token missing. Please log in.");
        }

        const response = await fetch(
          `http://localhost:8000/api/get/history?limit=${limit}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
          }
        );

        if (!response.ok) {

          if (response.status === 401 || response.status === 403) {
            throw new Error("Session expired or unauthorized.");
          }

          throw new Error(`Failed to fetch history (${response.status})`);
        }

        const data = await response.json();

        setHistoryData(data);
        setError(null);

      } catch (err) {

        if (err.name !== 'AbortError') {
          setError(err.message || "Unexpected error occurred.");
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      controller.abort();
    };

  }, [limit, retryTrigger]);

  const filteredData = historyData.filter(item =>
    item.topic_text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden md:block w-30 bg-black ">
        <Sidebar />
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">

        {/* Navbar */}
        <header className="sticky top-0 z-20 w-full bg-black backdrop-blur-md ">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="p-6 md:p-10 max-w-6xl w-full mx-auto flex-1">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-8 gap-4">

            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Activity History
              </h1>

              <p className="text-gray-400 mt-1">
                Review and manage your previously generated topics, notes, and study tracks.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 bg-[#0f0f0f] p-3 rounded-xl border border-green-900/40 shadow-lg shadow-green-900/10">

              <div className="text-center px-4 ">
                <span className="block text-2xl font-bold text-green-400">
                  {historyData.length}
                </span>

                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Records
                </span>
              </div>

              <div className="text-center px-4">
                <span className="block text-2xl font-bold text-green-300">
                  {new Set(historyData.map(h => h.subject).filter(Boolean)).size}
                </span>

                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Subjects
                </span>
              </div>

            </div>

          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* Search */}
            <div className="relative md:col-span-2">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />

              <input
                type="text"
                placeholder="Search topics or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading && historyData.length === 0}
                className="
                  w-full
                  pl-10
                  pr-4
                  py-2.5
                  bg-[#0a0a0a]
                  border
                  border-green-900/40
                  rounded-xl
                  text-white
                  placeholder:text-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500/30
                  focus:border-green-500
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-green-900/10
                "
              />

            </div>

            {/* Limit Dropdown */}
            <div className="flex items-center gap-2 bg-[#0f0f0f] px-3 py-2 border border-green-900/40 rounded-xl shadow-lg shadow-green-900/10">

              <SlidersHorizontal className="text-green-400 w-4 h-4 flex-shrink-0" />

              <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
                Limit:
              </span>

              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="
                  w-full
                  bg-transparent
                  text-sm
                  font-semibold
                  text-white
                  focus:outline-none
                  cursor-pointer
                "
              >
                <option value={3} className="bg-black">3</option>
                <option value={5} className="bg-black">5</option>
                <option value={10} className="bg-black">10</option>
                <option value={20} className="bg-black">20</option>
              </select>

            </div>

          </div>

          {/* Loading */}
          {loading && historyData.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-20 bg-[#0f0f0f] border border-green-900/40 rounded-2xl">

              <Loader2 className="w-8 h-8 text-green-400 animate-spin mb-3" />

              <p className="text-gray-400 font-medium text-sm">
                Loading history...
              </p>

            </div>

          ) : error ? (

            /* Error State */
            <div className="flex flex-col items-center justify-center p-8 bg-[#120909] border border-red-800/40 rounded-2xl text-center">

              <AlertCircle className="w-10 h-10 text-red-500 mb-3" />

              <h3 className="text-lg font-bold text-red-400">
                API Connection Error
              </h3>

              <p className="text-red-300 text-sm mt-1 max-w-md">
                {error}
              </p>

              <button
                onClick={() => setRetryTrigger(prev => prev + 1)}
                className="
                  mt-4
                  px-4
                  py-2
                  bg-black
                  border
                  border-red-800/40
                  text-red-300
                  text-sm
                  font-semibold
                  rounded-xl
                  hover:bg-red-950/30
                  transition
                "
              >
                Retry
              </button>

            </div>

          ) : filteredData.length > 0 ? (

            /* History Cards */
            <div className="space-y-4">

              {filteredData.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-[#0d0d0d]
                    border
                    border-slate-900/60
                    rounded-2xl
                    p-6
                    hover:border-green-900/40
                    hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]
                    transition-all
                    duration-300
                    group
                  "
                >

                  {/* Top */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">

                    <div className="flex items-center gap-2">

                      {/* Subject */}
                      <span className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        bg-green-950/40
                        text-green-300
                        border
                        border-green-800/40
                      ">

                        <BookOpen className="w-3 h-3" />

                        {item.subject || "No Subject"}

                      </span>

                      {/* Group */}
                      <span className="
                        inline-flex
                        items-center
                        gap-1
                        px-2
                        py-1
                        rounded-md
                        text-xs
                        font-medium
                        bg-[#161616]
                        text-gray-300
                        border
                        border-green-900/20
                      ">

                        <Layers className="w-3 h-3" />

                        Group: {item.history_group}

                      </span>

                    </div>

                    <span className="text-xs text-gray-500 font-mono">
                      ID: #{item.id}
                    </span>

                  </div>

                  {/* Title */}
                  <h3 className="
                    text-xl
                    font-bold
                    text-white
                    group-hover:text-green-800
                    transition-colors
                    duration-200
                  ">
                    {item.topic_text}
                  </h3>

                  {/* Notes */}
                  <p className="text-gray-300 mt-2 text-sm leading-relaxed line-clamp-3">
                    {item.topic_notes}
                  </p>

                  {/* Bottom */}
                  <div className="mt-4 pt-4 border-t border-green-900/20 flex flex-wrap items-center justify-between gap-3">

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5 items-center">

                      <Hash className="w-3.5 h-3.5 text-green-500 mr-1" />

                      {Object.values(item.keywords || {}).map((tag, idx) => (

                        <span
                          key={idx}
                          className="
                            text-xs
                            font-medium
                            bg-[#111]
                            text-green-300
                            border
                            border-green-900/30
                            px-2.5
                            py-0.5
                            rounded-md
                            hover:bg-green-950/30
                            transition
                          "
                        >
                          {String(tag)}
                        </span>

                      ))}

                      {Object.keys(item.keywords || {}).length === 0 && (
                        <span className="text-xs italic text-gray-500">
                          No tags
                        </span>
                      )}

                    </div>

                    {/* Button */}
                    <button className="
                      inline-flex
                      items-center
                      gap-1
                      text-xs
                      font-bold
                      text-green-700
                      hover:text-green-900
                      uppercase
                      tracking-wider
                      transition-all
                      group-hover:translate-x-1
                      cursor-pointer
                    ">

                      View Blueprint

                      <ArrowRight className="w-3.5 h-3.5" />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* Empty State */
            <div className="text-center py-12 bg-[#0d0d0d] border border-dashed border-green-900/30 rounded-2xl">

              <p className="text-gray-500 font-medium">
                No history entries found.
              </p>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}