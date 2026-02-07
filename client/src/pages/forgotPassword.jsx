import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Layout from "../component/layout/Layout";
import logo from "../assets/logo.jpeg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // 🔥 Yaha future me API call kar sakte ho
    console.log("Reset link sent to:", email);

    setMessage("Password reset link has been sent to your email.");
    setEmail("");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-bl from-[#fff7db] via-[#ffe9a8] to-[#ffd86b] px-4">

        <div className="w-full max-w-md bg-[#fff8e1] 
          border-2 border-yellow-500 rounded-2xl 
          shadow-2xl p-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-[120px] h-[120px] object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-3">
            Forgot Password
          </h2>

          <p className="text-center text-gray-600 mb-8 text-sm">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email Input */}
            <div className="mb-6 flex items-center border-b-2 border-yellow-400 pb-3">
              <FaEnvelope className="mr-3 text-yellow-600" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 
              transition font-bold py-3 rounded-xl"
            >
              Send Reset Link
            </button>
          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-6 text-green-700 text-center text-sm font-medium">
              {message}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
