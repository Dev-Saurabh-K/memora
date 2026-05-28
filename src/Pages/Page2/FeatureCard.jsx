import React from "react";
import FeatureIcon from "./FeatureCardIcon";


const FeatureCard = ({ title, sub, icon: Icon, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group w-full p-6 md:p-8 rounded-2xl border-2 flex flex-col items-center justify-center text-center select-none transition-all duration-300 ease-out cursor-pointer
        ${
          isActive
            ? "border-green-900 bg-green-950/20 shadow-lg shadow-emerald-900/20"
            : "border-zinc-800 bg-[#141416] hover:border-zinc-600 hover:bg-zinc-900/40 hover:shadow-xl"
        }
      `}
    >
      <div 
        className={`mb-4 p-3 rounded-xl transition-all duration-300
          ${isActive 
            ? "bg-green-900/10 text-green-900 scale-110" 
            : "bg-zinc-800/50 text-zinc-400 group-hover:text-amber-400 group-hover:bg-zinc-800"
          }`}
      >
        <FeatureIcon icons={Icon} />
      </div>

      <h3 
        className={`font-bold tracking-tight transition-colors duration-300 text-lg md:text-xl lg:text-2xl
          ${isActive ? "text-emerald-600" : "text-zinc-200 group-hover:text-white"}`}
      >
        {title}
      </h3>

      <p className="mt-2 text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xs">
        {sub}
      </p>
    </div>
  );
};

export default FeatureCard;