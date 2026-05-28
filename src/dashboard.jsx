import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./logo";

export default function Dashboard() {
  const [selectedClass, setSelectedClass] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const classes = [5, 6, 7, 8, 9, 10, 11, 12];

  const handleClick = async () => {
  setLoading(true);

  const token = localStorage.getItem("access_token") || "YOUR_ACCESS_TOKEN_HERE";

  try {
    const response = await axios.put(
      "http://localhost:8000/api/user/data",
      null, 
      {
        params: {
          user_class: selectedClass, 
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Saving chosen grade success:", response.data);
    navigate("/dashboard");
  } catch (error) {
    console.error("Failed to save user data:", error.response?.data || error.message);
    alert("Something went wrong saving your grade. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full bg-[#000000] text-stone-100 flex flex-col items-center justify-center font-sans px-4">
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Header Section */}
        <div className="space-y-3 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center tracking-tight">
            <span>Welcome to</span>
            <Logo className="h-10 ml-2.5 w-auto" />
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            To personalize your learning journey, please select your grade
            level.
          </p>
        </div>

       
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mt-6">
          {classes.map((grade) => {
            const isSelected = selectedClass === grade;
            return (
              <button
                key={grade}
                disabled={loading}
                onClick={() => setSelectedClass(grade)}
                className={`py-6 px-4 rounded-xl text-lg font-semibold transition-all duration-200 border-2 w-full active:scale-[0.98] select-none disabled:opacity-50
                  ${
                    isSelected
                      ? "bg-emerald-950/40 border-emerald-600 text-emerald-400 shadow-md shadow-emerald-950/50"
                      : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
              >
                Class {grade}
              </button>
            );
          })}
        </div>

        
        <div className="mt-8">
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-14 rounded-xl text-base tracking-wide transition-all duration-200 shadow-lg hover:shadow-emerald-900/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
