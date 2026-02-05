import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import logo from "../assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(login(loginData));
  };

  // Redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      alert("Login Successful 🎉");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-bl from-[#fff7db] via-[#ffe9a8] to-[#ffd86b] 
      relative overflow-hidden">

      {/* Right Side Curve Background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <svg
          viewBox="0 0 1440 900"
          className="absolute top-0 right-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#facc15"
            fillOpacity="0.5"
            d="M1440,0 
               C1100,200 1200,400 950,500 
               C700,600 800,800 500,900 
               L1440,900 Z"
          />
        </svg>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-[420px] px-10 py-12 
        border-2 border-yellow-500 rounded-2xl 
        bg-[#fff8e1] shadow-xl">

        {/* Logo */}
         <div className="flex justify-right mb-5">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-30 h-28 object-contain"
                  />
                </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-black mb-10">
          LOGIN
        </h2>

        {/* Email */}
        <div className="mb-8">
          <div className="flex items-center border-b border-yellow-400 pb-2">
            <FaEnvelope className="text-yellow-600 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Username/Email"
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-yellow-600"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <div className="flex items-center border-b border-yellow-400 pb-2">
            <FaLock className="text-yellow-600 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-yellow-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-700" />
              ) : (
                <FaEye className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex justify-between items-center mb-8 text-sm text-gray-700">
  
  <label className="flex items-center gap-2">
    <input type="checkbox" className="accent-yellow-700" />
    Remember me
  </label>

  <NavLink 
  to="/forgot-password"
  className="text-orange-600 hover:underline">
  Forgot password?
</NavLink>

</div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 
          text-black font-bold py-3 rounded-xl 
          shadow-md transition duration-300 hover:scale-105">
          LOGIN
        </button>

        {/* Signup Link */}
        <p className="text-center mt-8 text-sm text-black">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-600 font-semibold cursor-pointer hover:underline">
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
