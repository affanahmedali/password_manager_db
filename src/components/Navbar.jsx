import React from 'react'


const Navbar = () => {
  return (
    <nav className='flex justify-around items-center bg-slate-800 text-white py-4'>
        <div className='logo font-bold text-2xl'>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP</span> 
          <span className='text-green-700'>/&gt;</span>
        </div>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar