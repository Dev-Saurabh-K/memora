 import React from 'react';
 import {useState} from 'react';
 import { Link } from "react-router-dom";
 import memoraLogo from './assets/logo.svg';

export default function Dashboard() {
    const [selectedClass, setClasses] = useState(5);
    const classes = [5,6,7,8,9,10,11,12];
    const handleClick = () => {
      if (selectedClass) {
        alert(`You selected Class ${selectedClass}`);
      }
    };

  return (
          <div className="min-h-screen w-screen pl-3 pr-3 bg-[#121212] text-white flex flex-col items-center justify-center font-sans">
            <div className="w-full text-center">
                <div className="space-y-3">
                 <h1 className="text-3xl font-semibold flex items-center justify-center ">
                  <span>Welcome to</span>
                  <img 
    src={memoraLogo} 
    alt="Memora Logo" 
    className="h-11 w-auto object-contain translate-y-0.5" 
  />
                 </h1>
                 <p className="">To personalize your learning journey, please select your grade level.
                 </p>
                </div>
                <div className= "grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4" >
                     {classes.map((grade, index) => {
                        const isSelected = selectedClass === grade;
                        return (
                  <button
              
                onClick={() => setClasses(grade)}
                className={`py-10 px-2 rounded-xl text-lg font-medium transition-all duration-200 border-2 block w-full
                  ${isSelected 
                    ? 'bg-[#1a2e22] border-[#3b7a57] text-white shadow-lg' 
                    : 'bg-[#1e1e1e] border-transparent text-[#a0a0a0] hover:border-gray-700 hover:text-white'
                  }`}
              >
                Class {grade}
              </button>
                        );
                      })
                     }
                </div>
                    <div className="pt-7">
                      <Link to="/page2">
                     <button  
                     onClick={handleClick}
                     className="bg-[#2d533c] hover:bg-[#419360] text-[#ccc1c1] 
                     font-bold py-3 px-12 rounded-xl text-base tracking-wide transition-colors shadow-lg" >Continue</button>
                     </Link>
                    </div>
                    
            </div>
          </div>
  );
}