import React from "react";
import NavbarButtons from "../../Pages/page2/NavbarButtons";
import ProfileSec from "../../Pages/page2/ProfileSec";
export default function DasNavbar() {
    return (
        <>
        <div className='pl-3 pr-6 h-12 w-full flex justify-between items-center border-b border-gray-800 text-white'>
                <p className="font-bold">Dashboard</p>
         <div className='  flex gap-4 text-center' >
            
        <NavbarButtons/>
        <ProfileSec/>
  
    </div>
    </div>
    </>
    )
}