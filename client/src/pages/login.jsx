import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden 
      bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">

      {/* Animated Gradient Blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] 
        bg-gradient-to-br from-pink-300/40 to-yellow-300/40 
        rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute bottom-0 -left-32 w-[450px] h-[450px] 
        bg-gradient-to-br from-orange-300/40 to-rose-300/40 
        rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] 
        bg-gradient-to-br from-yellow-200/40 to-pink-200/40 
        rounded-full blur-3xl animate-pulse">
      </div>

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/40
        w-[420px] p-10 rounded-3xl shadow-2xl relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r 
            from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to continue your journey 🚀
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <div className="flex items-center bg-white/70 backdrop-blur-md
            rounded-xl px-4 py-3 shadow-inner border border-gray-200">
            <FaEnvelope className="text-orange-500 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="outline-none w-full bg-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex items-center bg-white/70 backdrop-blur-md
            rounded-xl px-4 py-3 shadow-inner border border-gray-200">
            <FaLock className="text-orange-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="outline-none w-full bg-transparent text-gray-700"
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
        <div className="flex justify-between items-center text-sm mb-8">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-orange-500" />
            Remember me
          </label>
          <a href="#" className="text-orange-500 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button className="w-full bg-gradient-to-r 
          from-orange-400 to-pink-500 
          hover:from-pink-500 hover:to-orange-400
          transition duration-500 text-white font-bold 
          py-3 rounded-xl shadow-lg hover:scale-105">
          LOGIN
        </button>

        {/* Signup */}
        <p className="text-center mt-8 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
