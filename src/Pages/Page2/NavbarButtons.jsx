
import React from 'react'
import BellNav from './BellNav'
import { SquaresExclude,Birdhouse } from 'lucide-react'


const NavbarButtons = () => {
  return (
    <div className='flex flex-row gap-6'>
        <button className='cursor-pointer hover:scale-120 transition duration-300'><SquaresExclude color='gray'/></button>
        <button className='cursor-pointer hover:scale-120 transition duration-300'><Birdhouse color='gray'/></button>
        <BellNav/>

    </div>
  )
}

export default NavbarButtons
