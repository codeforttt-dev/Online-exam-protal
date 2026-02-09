import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black font-bold"
      : "text-gray-900 hover:text-black transition duration-300";

  return (
    <>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50
        bg-gradient-to-r from-[#FFD42A] to-[#FFC107]
        border-b border-[#FFC107]
        shadow-lg px-16 py-4 flex justify-between items-center"
      >
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-35 md:h-35 w-auto object-contain"
          />
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/login"
            className="
              px-8 py-3
              rounded-full
              text-lg
              font-semibold
              border-2 border-black
              text-black
              bg-white
              hover:bg-black
              hover:text-white
              transition-all duration-300
              shadow-md hover:shadow-xl
              hover:scale-105
            "
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl text-black"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-20 right-6 bg-white shadow-xl rounded-2xl p-6">
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-black hover:text-[#FFC107] transition duration-300"
            >
              Login
            </NavLink>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {children}
    </>
  );
}

export default Layout;
