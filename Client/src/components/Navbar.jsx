import React from 'react';
import { Sun } from 'lucide-react'; // use: npm install lucide-react

const Navbar = () => {
  return (
    <nav className="w-full bg-[#1d1f20] text-white font-inter">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold uppercase tracking-wide">Stack Security</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-light">
          <li><a href="#" className="hover:text-gray-200">Home</a></li>
          <li><a href="#courses" className="hover:text-gray-300">Courses</a></li>
          <li><a href="#Blogs" className="hover:text-gray-300">Blogs</a></li>
          <li><a href="#Products" className="hover:text-gray-300">Products</a></li>
          <li><a href="#About" className="hover:text-gray-300">About</a></li>
          <li><Sun className="w-5 h-5" /></li>
        </ul>

        {/* Log In Button */}
        <button className="ml-4 bg-[#f5f4ef] text-black text-lg font-medium px-4 py-1.5 rounded-md hover:bg-gray-300 transition">
          Log In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
