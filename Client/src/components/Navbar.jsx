import React from 'react'


const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/favicon.png" alt="LMS Logo" className="h-10 w-10" />
          <span className="text-xl font-semibold text-[#1d1f20]">LMS</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-[#1d1f20] font-medium">
          <a href="#" className="hover:text-orange-500">Home</a>
          <a href="#" className="hover:text-orange-500">Course</a>
          <a href="#" className="hover:text-orange-500">Pages</a>
          <a href="#" className="hover:text-orange-500">Shortcodes</a>
          <a href="#" className="hover:text-orange-500">Shop</a>
          <a href="#" className="hover:text-orange-500">Blog</a>
        </nav>

        {/* Login/Register */}
        <div className="hidden md:flex space-x-4">
          <button className="text-[#1d1f20] font-medium hover:text-orange-500">Login</button>
          <button className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">Register</button>
        </div>
      </div>
    </header>
  )
}

export default Header
