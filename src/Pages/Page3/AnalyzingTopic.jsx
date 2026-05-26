import React from "react"

const AnalyzingTopic = ({
  topics = [],
  currentTopic = 0,
}) => {
  return (
    <div className="flex flex-col gap-3 mt-6 text-zinc-300 w-[90%] lg:w-[70%]">
      {topics.map((topic, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 transition-all duration-500 ${
            i === currentTopic
              ? "text-white"
              : "text-zinc-500"
          }`}
        >
          {/* animated dot */}
          <div
            className={`h-2 w-2 rounded-full ${
              i === currentTopic
                ? "bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse"
                : "bg-zinc-600"
            }`}
          ></div>

          {/* topic text */}
          <p className="text-sm lg:text-lg">
            {topic}
          </p>
        </div>
      ))}
    </div>
  )
}

export default AnalyzingTopic
