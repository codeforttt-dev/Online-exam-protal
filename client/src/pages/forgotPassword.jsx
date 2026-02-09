import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/thunks/emailThunks";
import { clearMessage } from "../redux/slices/emailSlice";
import Layout from "../component/layout/Layout";
import logo from "../assets/logo.jpeg";
import Footer from "../component/layout/Footer";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(
    (state) => state.email
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center 
        bg-gradient-to-r from-[#FFD42A] to-[#FFC107] px-4"
      >

        {/* Bigger Card */}
        <div
          className="w-full max-w-xl md:max-w-2xl
          bg-white
          border-2 border-[#FFC107]
          rounded-3xl
          shadow-2xl
          p-14 md:p-16"
        >

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="Logo"
              className="w-[150px] h-[150px] object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Forgot Password
          </h2>

          <p className="text-center text-gray-700 mb-10 text-base">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email Input */}
            <div className="mb-8 flex items-center border-b-2 border-gray-900 pb-4">
              <FaEnvelope className="mr-4 text-gray-900 text-xl" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-lg text-gray-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 rounded-xl text-lg transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FFD42A] to-[#FFC107] hover:scale-105"
                }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-8 bg-green-100 text-green-700 px-6 py-4 rounded-lg text-center text-sm font-medium">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 bg-red-100 text-red-700 px-6 py-4 rounded-lg text-center text-sm font-medium">
              {error}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default ForgotPassword;
