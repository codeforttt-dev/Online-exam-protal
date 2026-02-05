import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { registerUser } from "../features/authSlice";
import { useDispatch, useSelector} from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username:" ",
    phoneNo:" ",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
     // !formData.Username ||
     // !formData.phoneNO ||
      !formData.confirmPassword
    ) {
      
    }

    /*
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
      */
dispatch(registerUser(formData));
    // Store data in localStorage
    // localStorage.setItem("user", JSON.stringify(formData));


    // Redirect to login
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-bl from-[#fde68a] via-[#fff7e6] to-[#fffaf5]
      relative overflow-hidden"
    >

      {/* Curve Background */}
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
          />=
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-[420px] px-10 py-12 border-2 border-yellow-400 rounded-xl">

        {/* Logo */}
        <div className="flex justify-right mb-5">
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-30 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="flex justify-center text-xl font-bold mb-10 text-gray-800">
          Create an account
        </h2>

        {/* Name */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-900 pb-2">
            <FaUser className="text-amber-500 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-amber-900"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-900 pb-2">
            <FaEnvelope className="text-amber-500 mr-3" />
            <input
              type="text"
              name="username"
              placeholder="User Name"
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-amber-900"
            />
          </div>
        </div>
          <div className="mb-8">
          <div className="flex items-center border-b border-amber-900 pb-2">
            <FaEnvelope className="text-amber-500 mr-3" />
            <input
              type="text"
              name="email"
              placeholder=" email "
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-amber-900"
            />
          </div>
        </div>
        {/*}
          <div className="mb-8">
          <div className="flex items-center border-b border-amber-900 pb-2">
            <FaEnvelope className="text-amber-500 mr-3" />
            <input
              type="Number"
              name="Phone NO"
              placeholder="Phone No."
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-amber-900"
            />
          </div>
        </div>
        */}

        {/* Password */}
        <div className="mb-8">
          <div className="flex items-center border-b border-amber-900 pb-2">
            <FaLock className="text-amber-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-amber-900"
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

       { /* Confirm Password

        <div className="mb-8">
          <div className="flex items-center border-b border-amber-900 pb-2">
            <FaLock className="text-amber-500 mr-3" />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-amber-900"
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
        */}

        {/* Remember */}
        <div className="flex items-center gap-2 mb-10 text-sm text-gray-600">
          <input type="checkbox" className="accent-amber-500" />
          Remember me
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
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
