import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-green-600 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold'>Logo</div>
        <div className='hidden md:flex space-x-4'>
          <a href='#about' className='hover:text-gray-400'>About</a>
          <a href='#explore' className='hover:text-gray-400'>Explore</a>
          <a href='#contact' className='hover:text-gray-400'>Contact Us</a>
        </div>
        <div className='md:hidden'>
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden'>
          <a href='#about' className='block py-2 px-4 hover:bg-gray-700'>About</a>
          <a href='#explore' className='block py-2 px-4 hover:bg-gray-700'>Explore</a>
          <a href='#contact' className='block py-2 px-4 hover:bg-gray-700'>Contact Us</a>
        </div>
      )}
    </nav>
  );
};