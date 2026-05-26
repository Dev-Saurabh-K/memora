import React from 'react'

const LoadingLine = ({ progress }) => {
  const totalBars =
    window.innerWidth >= 1024 ? 100 : 50

  const activeBars = Math.floor(
    (progress / 100) * totalBars
  )

  return (
    <div className="flex gap-1">
      {Array(totalBars)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`h-4 w-1 lg:h-6 lg:w-2 rounded-sm ${
              i < activeBars
                ? "bg-green-400 shadow-[0_0_8px_#4ade80]"
                : "bg-zinc-700"
            }`}
          />
        ))}
    </div>
  )
}

export default LoadingLine