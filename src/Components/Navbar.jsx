import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage or perform any other logout-related tasks
    localStorage.removeItem('token');
    // Redirect user to the login page
    navigate('/login');
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className='h-16 w-full absolute top-0 bg-slate-700 flex items-center px-4 text-white justify-between'>
      <Link to="/"><h1 className='text-2xl'>Hacker<span className='text-red-500'>Kernel</span></h1></Link>
      {isLoggedIn && <button className='bg-red-500 px-5 py-1 rounded-md' onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Navbar;
