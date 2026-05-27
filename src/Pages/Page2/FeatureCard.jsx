import { FeatherIcon } from "lucide-react";
import React, { useState } from "react";
import FeatureIcon from "./FeatureCardIcon";

const FeatureCard = (props) => {
  const Icons = props.icon;

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log(active);
  };

  return (
    <div
      onClick={handleClick}
      className={`border h-[80%] lg:h-[88%] w-[30%] lg:w-[32%] rounded-2xl flex  flex-col border-zinc-700 bg-[#1c1c1e]
     cursor-pointer px-1  text-white
    hover:border-4 hover:bg-green-500/10 hover:border-[#3b7a57] hover:shadow-green-400/20 hover:shadow-md
    
    ${
      active
        ? "border-[#3b7a57] bg-green-500/10 shadow-green-400/20 shadow-md"
        : "border-zinc-700"
    }
    `}
    >
      <div className="flex items-center justify-center w-full h-full flex-col">
        <FeatureIcon icons={Icons} className={`text-amber-300`} />
        <h1 className=" text-[14px] md:text-[21px] lg:text-[28px]">
          {props.title}
        </h1>
        <div className="mt-px  text-[10px] md:px-6 md:text-[15px]">
          <h3 className=" text-zinc-400 text-center">{props.sub}</h3>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
