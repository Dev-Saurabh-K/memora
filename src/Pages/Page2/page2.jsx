import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TopSec from './topSec'
import CenterSec from './centerSec'
import GenerateButton from './GenerateButton'
import History from './History';

function page2(props) {
    return (
        <div className='bg-[#000000] flex h-screen w-full '>

            <Sidebar />
            <div className='w-full flex flex-col items-center'>
                <Navbar />
                <TopSec />
                <div className="flex flex-col lg:flex-row md:flex-row gap-10 text-stone-50">
                    <CenterSec/>
                    <History/>
                </div>
                
                <GenerateButton/>
            </div>
        </div>
    )
}

export default page2
