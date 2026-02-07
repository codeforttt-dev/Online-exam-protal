import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

function Layout({ children }) {   // ✅ receive children
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-red-500 font-bold"
      : "text-gray-700 hover:text-red-500 transition duration-300";

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl
        bg-gradient-to-r from-yellow-100/80 via-orange-100/80 to-rose-100/80
        border-b border-white/40 shadow-lg px-16 py-4 flex justify-between items-center">

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
      border-2 border-slate-400
      text-slate-900
      hover:bg-yellow-400
      hover:text-black
      transition-all duration-300
      shadow-md hover:shadow-xl
      hover:scale-105
    "
  >
    Login
  </NavLink>

</div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-2xl">
            ☰
          </button>
        </div>

        {open && (
 <NavLink
  to="/login"
  onClick={() => setOpen(false)}
  className="text-5xl font-semibold text-slate-800 hover:text-yellow-500 transition duration-300"
>
  Login
</NavLink>
        )}
      </nav>

      {/* ✅ IMPORTANT — Render Page Content */}
      {children}
    </>
  );
}

export default Layout;
