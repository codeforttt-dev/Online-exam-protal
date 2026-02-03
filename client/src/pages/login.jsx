import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

 function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 relative overflow-hidden">

      {/* Background Curve */}
      <div className="absolute top-0 left-0 w-full h-72 bg-yellow-400 rounded-b-[120px]"></div>

      <div className="bg-white w-[380px] p-8 rounded-3xl shadow-xl relative z-10">

        {/* Logo */}
        <div className="flex justify-between items-center mb-10">
          <div className="text-yellow-500 text-2xl font-bold">🔥</div>
          <div className="text-xl">☰</div>
        </div>

        <h1 className="text-3xl font-bold mb-8">Login</h1>

        {/* Email */}
        <div className="mb-6">
          <div className="flex items-center border-b-2 border-yellow-300 py-2">
            <FaEnvelope className="text-yellow-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex items-center border-b-2 border-yellow-300 py-2">
            <FaLock className="text-yellow-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="outline-none w-full bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-yellow-500" />
            Remember me
          </label>
          <a href="#" className="text-gray-500 hover:text-yellow-500">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-bold py-3 rounded-xl">
          LOGIN
        </button>

        {/* Signup */}
        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <span className="text-yellow-500 font-semibold cursor-pointer">
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}
 export default Login;