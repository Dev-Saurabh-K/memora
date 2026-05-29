import Navbar from "../../Page2/Navbar";

import { BookOpen, Sparkles } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        w-full
        h-16
        px-4 md:px-6
        flex
        items-center
        justify-between
        border-b border-white/10
        bg-[#050505]/80
        backdrop-blur-2xl
        text-white
        shadow-[0_4px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* ICON */}
        <div
          className="
            hidden sm:flex
            items-center
            justify-center
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br
            from-emerald-400/20
            to-green-500/10
            border border-emerald-400/20
            shadow-[0_0_25px_rgba(16,185,129,0.15)]
          "
        >
          <BookOpen className="text-emerald-400" size={22} />
        </div>

        {/* TITLE */}
        <div className="flex flex-col">

          <div className="flex items-center gap-2">

            <h1
              className="
                text-[15px]
                md:text-[20px]
                font-semibold
                tracking-tight
                text-white
              "
            >
              Interactive Study Notes
            </h1>

            <Sparkles
              size={16}
              className="text-emerald-400 hidden md:block"
            />
          </div>

          <p
            className="
              text-[11px]
              md:text-xs
              text-zinc-500
              mt-[2px]
              tracking-wide
            "
          >
            AI Powered Learning Workspace
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* NAV BUTTONS */}
        <div
          className="
            flex items-center gap-2
            px-2 py-1.5
            rounded-2xl
            bg-white/[0.03]
            border border-white/10
          "
        >
          <Navbar />
        </div>

        {/* PROFILE */}
        <div
          className="
            flex items-center
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            px-2 py-1.5
            hover:bg-white/[0.05]
            transition-all duration-300
          "
        >
       
        </div>
      </div>
    </header>
  );
}