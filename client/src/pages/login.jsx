import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/userThunk";
import logo from "../assets/logo.jpeg";
import Layout from "../component/layout/Layout";
import Footer from "../component/layout/Footer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...loginData,
      username: loginData.username.startsWith("@")
        ? loginData.username
        : "@" + loginData.username,
    };

    const res = await dispatch(loginUser(formattedData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center 
        bg-gradient-to-r from-[#FFD42A] to-[#FFC107]"
      >

        {/* Card */}
        <div
          className="relative z-10 w-[95%] sm:w-[550px] px-12 py-14 
          border-2 border-[#FFC107] rounded-2xl 
          bg-white shadow-2xl"
        >

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-[240px] h-[120px] object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            LOGIN
          </h2>

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div className="mb-8 flex items-center border-b border-gray-900 pb-3">
              <FaEnvelope className="mr-3 text-lg text-gray-900" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg text-gray-900"
              />
            </div>

            {/* Password */}
            <div className="mb-3 flex items-center border-b border-gray-900 pb-3">
              <FaLock className="mr-3 text-lg text-gray-900" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-900"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-center mt-4">
                {error}
              </p>
            )}

            {/* Forgot */}
            <div className="text-right mb-8">
              <NavLink
                to="/forgot-password"
                className="text-lg font-semibold text-black hover:text-[#FFC107] transition"
              >
                Forgot Password?
              </NavLink>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFD42A] to-[#FFC107]
              text-black font-bold py-4 text-lg rounded-xl
              hover:scale-105 transition-all duration-300"
            >
              LOGIN
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Login;
