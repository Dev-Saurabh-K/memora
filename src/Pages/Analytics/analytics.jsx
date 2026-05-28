import Sidebar from "../Page2/Sidebar";
import Navbar from "../Page2/Navbar";

export default function analytics() {
    return (
         <div className='h-screen bg-[#0c0c0e] flex text-zinc-200 font-sans overflow-hidden'>
            <Sidebar />

            <div className='flex-1 flex flex-col min-w-0 px-12'>
               
                <div className='w-full bg-[#0c0c0e]/50 backdrop-blur-sm'>
                    <Navbar />
                </div>

               
                <div className='flex-1 p-6 flex flex-col overflow-hidden max-w-5xl w-full mx-auto'>

                </div>

            </div>
        </div>
            )
}
