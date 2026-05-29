import { useState, useEffect } from "react";
import Sidebar from "../../Pages/Page2/Sidebar";
import Navbar from "../Page2/Navbar";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";
import { Ellipsis } from "lucide-react";

const getGroupNumber = (group) => {
  const match = String(group || "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [groupBy, setGroupBy] = useState("history");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const history_group = location.state?.history_group;

  useEffect(() => {
    const fetchTopics = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No access token found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/get/topic", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  const handleClick = (topic) => {
    navigate("/study-notes", {
      state: {
        hg: topic.history_group,
        topic: topic.topic_text,
        subject: topic.subject,
      },
    });
  };

  const filteredTopics = history_group
    ? topics.filter((topic) => topic.history_group === history_group)
    : topics;

  // Sort Topics
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    const groupA = getGroupNumber(a.history_group);
    const groupB = getGroupNumber(b.history_group);

    return sortOrder === "newest" ? groupB - groupA : groupA - groupB;
  });

  // Group Topics
  const groupedTopics = sortedTopics.reduce((acc, topic) => {
    const groupKey =
      groupBy === "subject"
        ? topic.subject || "Unassigned Subject"
        : topic.history_group || "General";

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(topic);
    return acc;
  }, {});

  // Sort Groups
  const sortedGroupEntries = Object.entries(groupedTopics).sort(
    ([groupA], [groupB]) => {
      const a = getGroupNumber(groupA);
      const b = getGroupNumber(groupB);

      return sortOrder === "newest" ? b - a : a - b;
    },
  );

  return (
    <div className="h-screen bg-[#000000] text-slate-100 flex overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto md:pl-5 pl-8">
        <Navbar />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
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
                  <Ellipsis className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800/80 rounded-lg shadow-xl z-20 py-1 text-sm text-zinc-300">
                    <button
                      onClick={() => {
                        setGroupBy("history");
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-800/60 transition-colors ${
                        groupBy === "history"
                          ? "text-indigo-400 font-medium"
                          : ""
                      }`}
                    >
                      Group by History
                    </button>

                    <button
                      onClick={() => {
                        setGroupBy("subject");
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-800/60 transition-colors ${
                        groupBy === "subject"
                          ? "text-indigo-400 font-medium"
                          : ""
                      }`}
                    >
                      Group by Subject
                    </button>

                    <div className="border-t border-zinc-800 my-1"></div>

                    <button
                      onClick={() => {
                        setSortOrder("newest");
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-800/60 transition-colors ${
                        sortOrder === "newest"
                          ? "text-indigo-400 font-medium"
                          : ""
                      }`}
                    >
                      Sort: Newest First
                    </button>

                    <button
                      onClick={() => {
                        setSortOrder("oldest");
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-800/60 transition-colors ${
                        sortOrder === "oldest"
                          ? "text-indigo-400 font-medium"
                          : ""
                      }`}
                    >
                      Sort: Oldest First
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
                      {groupBy === "subject"
                        ? `Subject: ${groupId}`
                        : `History Group: ${groupId}`}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {groupItems.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => handleClick(topic)}
                        className="transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                      >
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
