import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#E0E2DB] w-full'>
      <div className='m-auto flex flex-row items-end py-4 w-max gap-3'>
        <h1 className='text-3xl text-center'>Conway's Game of Life </h1>
        <p className='text-base'>~ by Prasuk Jain</p>
      </div>
    </nav>
  )
}

export default Navbar;