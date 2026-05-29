export default function MainContent({ onTermClick, data, subject, topic }) {
  return (
    <div className="flex-1 space-y-6 max-w-none">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-zinc-100 text-xl font-semibold flex items-center gap-2 flex-wrap">
          {subject && (
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md font-medium uppercase tracking-wider">
              {subject}
            </span>
          )}
          <span className="text-zinc-400 font-normal">
            {topic ? `${topic} Notes` : "AI Generated Notes"}
          </span>
        </h2>
      </div>

      {/* CONTENT */}
      <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-zinc-300">
        {/* MAIN PARAGRAPH
        {data?.paragraph ? (
          <p className="whitespace-pre-line leading-8 text-zinc-300">
            {data.paragraph}
          </p>
        ) : (
          <p className="text-zinc-500 italic">No note content available.</p>
        )} */}
        {/* MAIN PARAGRAPH */}
        {data?.topic_notes ? (
          <p className="whitespace-pre-line leading-8 text-zinc-300">
            {data.topic_notes}
          </p>
        ) : (
          <p className="text-zinc-500 italic">No note content available.</p>
        )}

        {/* KEYWORDS */}
        {data?.keywords && data.keywords.length > 0 && (
          <div className="pt-8 border-t border-white/5 mt-8">
            <h3 className="text-zinc-200 text-base font-semibold mb-4">
              Important Keywords
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {data.keywords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => onTermClick(word)}
                  className="
                    px-3 py-1.5
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    text-zinc-300
                    text-sm
                    hover:bg-emerald-500/10
                    hover:border-emerald-500/30
                    hover:text-emerald-400
                    hover:scale-[1.02]
                    transition-all duration-200
                  "
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CHAT INPUT */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="relative">
          <input
            type="text"
            placeholder={`Ask AI a question about ${topic || "this topic"}...`}
            className="
              w-full
              bg-white/[0.02]
              border border-white/10
              rounded-xl
              px-4 py-3.5
              text-sm
              focus:outline-none
              focus:border-emerald-500/50
              focus:bg-white/[0.04]
              text-zinc-200
              placeholder-zinc-500
              transition-all duration-300
            "
          />
        </div>
      </div>
    </div>
  );
}
