import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TopSec from './topSec'
import CenterSec from './centerSec'
import GenerateButton from './GenerateButton'

function page2(props) {
    return (
        <div className='bg-stone-950 flex h-screen w-full '>

            <Sidebar />
            <div className='w-full flex flex-col items-center'>
                <Navbar />
                <TopSec />
                <div className='px-4'>
                <CenterSec/>

                </div>
                <GenerateButton/>
            </div>
        </div>
    )
}

export default page2
