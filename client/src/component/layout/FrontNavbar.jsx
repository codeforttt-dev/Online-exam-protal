import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

function FrontNavbar() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-red-500 font-bold"
      : "text-gray-700 hover:text-red-500 transition duration-300";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl
      bg-gradient-to-r from-yellow-100/80 via-orange-100/80 to-rose-100/80
      border-b border-white/40 shadow-lg px-16 py-4 flex justify-between items-center">

      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-3">
        <div className=" ">
          
        </div>

       <div className="flex justify-right ml-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-30 h-30 object-contain"
                />
              </div>
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        <NavLink to="/login" className={linkStyle}>
          Login
        </NavLink>

        <NavLink
          to="/signup"
          className="px-6 py-2 rounded-full 
          bg-gradient-to-r from-red-500 to-pink-500 
          text-white font-semibold shadow-lg 
          hover:scale-105 transition duration-300"
        >
          Signup
        </NavLink>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full 
          bg-white shadow-lg py-6 flex flex-col items-center gap-6 md:hidden">

          <NavLink to="/login" onClick={() => setOpen(false)}>
            Login
          </NavLink>

          <NavLink to="/signup" onClick={() => setOpen(false)}>
            Signup
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default FrontNavbar;
