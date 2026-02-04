import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-bl from-[#fde68a] via-[#fff7e6] to-[#fffaf5]
      relative overflow-hidden"
    >

      {/* Softer Premium Curve (Now More Top Right) */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <svg
          viewBox="0 0 1440 900"
          className="absolute top-0 right-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#fcd34d"
            fillOpacity="0.6"
            d="M1440,0 
               C1100,200 1200,400 950,500 
               C700,600 800,800 500,900 
               L1440,900 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-[420px] px-10 py-12">

        {/* Top Icons */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-3xl text-amber-500">🔥</div>
          <div className="text-2xl cursor-pointer text-gray-700">≡</div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Create an account
        </h2>

        {/* Name */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-300 pb-2">
            <FaUser className="text-amber-500 mr-3" />
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent outline-none placeholder-amber-400"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-300 pb-2">
            <FaEnvelope className="text-amber-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none placeholder-amber-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-300 pb-2">
            <FaLock className="text-amber-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent outline-none placeholder-amber-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-300 pb-2">
            <FaLock className="text-amber-500 mr-3" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none placeholder-amber-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2 mb-10 text-sm text-gray-600">
          <input type="checkbox" className="accent-amber-500" />
          Remember me
        </div>

        {/* Button */}
        <button
          className="w-full bg-gradient-to-r 
          from-amber-400 via-yellow-300 to-amber-400 
          hover:from-yellow-400 hover:to-amber-500
          text-black font-bold py-3 rounded-lg 
          shadow-lg transition duration-500 hover:scale-105"
        >
          SIGN UP
        </button>

        {/* Login */}
        <p className="text-center mt-8 text-sm text-gray-700">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-amber-600 font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
