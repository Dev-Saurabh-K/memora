import React from "react";
import Sidebar from "../../Pages/page2/Sidebar";
import DasNavbar from "./DasNavbar";
import Card from "./Card";
import {Ellipsis} from 'lucide-react';

export default function Home() {
       const cards = [
    {
      title: "Cell Division",
      subtitle: "AI generated",
      progress: 60
    },
    {
      title: "Plant Biology",
      subtitle: "AI generated",
      progress: 80
    },
    {
      title: "Human Anatomy",
      subtitle: "AI generated",
      progress: 45
    }
  ];

    return (
        <div className='h-screen bg-[#121212] flex'>
            <Sidebar />

            <div className='flex-1 flex flex-col'>

                <DasNavbar />

                <div className='flex-1 p-4 flex flex-col overflow-hidden '>

                    <div className="ml-5">
                    <h1 className="text-white font-medium text-2xl">Welcome, Saurabh!</h1>
                     <p className="text-gray-400 mt-1 ">Advanced Dashboard,</p>
                     </div>

                     <div className="flex items-center gap-3 h-auto shadow-md">
                     <h1 className="text-white text-xl mt-4 font-medium">Topic Cores</h1>
                     <button className="ml-auto mr-1"> <Ellipsis className="w-6 h-6 text-gray-400 "/></button>
                    </div>

                <div className="flex flex-wrap gap-4 mt-4">
                {cards.map((card, index) => (
            <Card
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            progress={card.progress}
          />
           ))}
         </div>

             </div>
            </div>
        </div>

    )
}