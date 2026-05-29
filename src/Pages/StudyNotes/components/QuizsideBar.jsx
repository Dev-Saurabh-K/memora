export default function QuizSidebar() {
  const options = [
    "Perform photosynthesis",
    "Support cell rigidity",
    "Store amino acids",
  ];

  return (
    <aside className="w-80 bg-[#0A0F0A] border-l border-[#1B231B] flex flex-col justify-between overflow-y-auto text-white">

      {/* Top Section */}
      <div className="p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-gray-100">
              Dynamic Assessment
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">
              Interactive learning evaluation
            </p>
          </div>

          <button className="w-8 h-8 rounded-lg bg-[#111811] hover:bg-[#1A241A] transition flex items-center justify-center text-gray-400 hover:text-white">
            ⋮
          </button>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-3 mb-7">

          {/* Active Quiz */}
          <div className="group bg-gradient-to-br from-[#132116] to-[#101810] border border-[#28432E] rounded-2xl p-4 cursor-pointer hover:border-[#4ade80]/40 hover:shadow-[0_0_20px_rgba(74,222,128,0.08)] transition-all duration-300">

            <div className="flex gap-3 items-start">
              <div className="w-11 h-11 rounded-xl bg-[#19311E] flex items-center justify-center text-lg">
                🌿
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-100 group-hover:text-[#4ade80] transition">
                  Plant Biology Quiz
                </h3>

                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  Test your understanding of plant structures and photosynthesis.
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] bg-[#1E2C1F] text-[#4ade80] px-2 py-1 rounded-full">
                    Active
                  </span>

                  <span className="text-[10px] text-gray-500">
                    12 Questions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Locked Quiz */}
          <div className="bg-[#101510] border border-[#1A221A] rounded-2xl p-4 opacity-60 cursor-not-allowed">

            <div className="flex gap-3 items-start">
              <div className="w-11 h-11 rounded-xl bg-[#171D17] flex items-center justify-center text-lg">
                🔒
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400">
                  Comprehensive Exam
                </h3>

                <p className="text-[11px] text-gray-600 mt-1">
                  Unlock after completing all topic quizzes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-[#1B231B] flex-1"></div>

          <span className="text-[10px] text-gray-600 tracking-widest">
            QUICK QUIZ
          </span>

          <div className="h-px bg-[#1B231B] flex-1"></div>
        </div>

        {/* Quiz Box */}
        <div className="bg-[#101510] border border-[#1C251C] rounded-2xl p-5 shadow-lg">

          <div className="mb-5">
            <span className="text-[10px] uppercase tracking-widest text-[#4ade80]">
              Biology
            </span>

            <h3 className="text-sm font-medium text-gray-100 mt-2 leading-relaxed">
              What is the primary function of chloroplasts?
            </h3>
          </div>

          <div className="space-y-3">
            {options.map((option, index) => (
              <label
                key={index}
                className="group flex items-center gap-3 p-3 rounded-xl border border-[#1C251C] hover:border-[#315438] hover:bg-[#151D15] transition cursor-pointer"
              >
                <input
                  type="radio"
                  name="quiz"
                  className="accent-[#4ade80] scale-110"
                />

                <span className="text-[12px] text-gray-300 group-hover:text-white transition">
                  {option}
                </span>
              </label>
            ))}
          </div>

          {/* Button */}
          <button className="w-full mt-5 bg-[#4ade80] hover:bg-[#3CC46D] text-black font-semibold text-sm py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
            Submit Answer
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="p-5 border-t border-[#1B231B] bg-[#0C120C]">

        <div className="space-y-5">

          {/* Progress Item */}
          <div>
            <div className="flex justify-between items-center mb-2 text-[11px]">
              <span className="text-gray-400">
                Topic Completion
              </span>

              <span className="text-[#4ade80] font-medium">
                64%
              </span>
            </div>

            <div className="h-2 rounded-full bg-[#182018] overflow-hidden">
              <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]"></div>
            </div>
          </div>

          {/* Progress Item */}
          <div>
            <div className="flex justify-between items-center mb-2 text-[11px]">
              <span className="text-gray-400">
                Important Concepts
              </span>

              <span className="text-[#4ade80] font-medium">
                30%
              </span>
            </div>

            <div className="h-2 rounded-full bg-[#182018] overflow-hidden">
              <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]"></div>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}