import NavbarButtons from "../../Page2/NavbarButtons";
import ProfileSec from "../../Page2/ProfileSec";

export default function Topbar() {
    return (
        <>
        <div className='pl-3 pr-6 h-12 w-full flex justify-between items-center border-b border-gray-800 text-white'>
                <div className="flex items-center text-[14px] md:text-[20px] h-auto shadow-md">
                <p className="font-medium ">Interactive Study Notes :</p>
                <p className="font-medium"> Study hub</p>
                </div>
         <div className='flex gap-4 text-center' >
            
        <NavbarButtons/>
        <ProfileSec/>
  
    </div>
    </div>
    </>
    )
}