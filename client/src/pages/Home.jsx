import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/thunks/userThunk";
import heroVideo from "../assets/hero-video.mp4";
import logo from "../assets/logo.jpeg";
import Layout from "../component/layout/Layout";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, username, password } = formData;

    if (!name || !email || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    const res = await dispatch(signupUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      alert("Signup Successful 🎉");
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">

        {/* Background Video */}
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay */}
     
        {/* Blur Effects */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] 
          bg-gradient-to-br from-yellow-300/40 to-amber-400/40 
          rounded-full blur-3xl animate-pulse">
        </div>

        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] 
          bg-gradient-to-br from-amber-300/40 to-yellow-400/40 
          rounded-full blur-3xl">
        </div>

        {/* Split Layout */}
        <div className="relative z-10 grid md:grid-cols-2 items-center 
          min-h-screen px-10 md:px-24 gap-16">

{/* LEFT SIDE LARGE GLASS CARD */}
<div className="
  relative
  backdrop-blur-2xl
  bg-yellow-100/70
  border border-yellow-200
  rounded-[60px]
  p-24
  shadow-2xl
  w-[95%] md:w-[85%]
  max-w-6xl
  space-y-12
">

  {/* Heading */}
  <h2 className="
    text-4xl md:text-5xl
    font-extrabold
    text-gray-900
    leading-tight
  ">
    The International
    <span className="block mt-4">
      Unconventional{" "}
      <span className="text-orange-500">
        Olympiads ++
      </span>
    </span>
  </h2>

  {/* Paragraph */}
  <p className="
    text-lg md:text-2xl
    leading-[1.8]
    text-gray-800
    max-w-4xl
  ">
    Explore The International Unconventional Olympiads ++. 
    A global platform for creative minds to compete in non-traditional 
    challenges promoting critical thinking and innovation.
  </p>

  {/* Buttons */}
  <div className="flex gap-8 mt-6">

    <button className="
      px-12 py-4
      text-xl
      rounded-full
      bg-blue-200
      text-gray-900
      font-semibold
      shadow-md
      hover:bg-blue-300
      transition-all duration-300
    ">
      Login
    </button>

    <button className="
      px-12 py-4
      text-xl
      rounded-full
      border border-orange-400
      text-orange-600
      font-semibold
      hover:bg-orange-400
      hover:text-white
      transition-all duration-300
    ">
      Learn More
    </button>

  </div>
</div>



          {/* RIGHT SIDE (Your Signup UI with improved padding) */}
          <div className="flex justify-end">
       <div className="
  relative z-10
  w-95% md:w-[70%]
  min-h-[90vh]
  px-10 md:px-16
  py-12 md:py-16
  border-2 border-yellow-400
  rounded-3xl
  bg-gradient-to-bl from-[#fde68a] via-[#fff7e6] to-[#fffaf5]
  shadow-2xl
  flex flex-col justify-center
">

  {/* Logo */}
  <div className="flex justify-center mb-5">
    <img src={logo} alt="Logo" className="w-35 h-35 object-contain" />
  </div>

  {/* Heading */}
  <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
    Create an Account
  </h2>

  {/* Form */}
  <form onSubmit={handleSignup} className="space-y-8">

    {/* Name */}
    <div className="flex items-center border-b-2 border-amber-800 pb-4">
      <FaUser className="text-amber-600 mr-4 text-2xl" />
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-lg py-3"
      />
    </div>

    {/* Username */}
    <div className="flex items-center border-b-2 border-amber-800 pb-4">
      <FaUser className="text-amber-600 mr-4 text-2xl" />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-lg py-3"
      />
    </div>

    {/* Email */}
    <div className="flex items-center border-b-2 border-amber-800 pb-4">
      <FaEnvelope className="text-amber-600 mr-4 text-xl" />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-lg py-3"
      />
    </div>

    {/* Password */}
    <div className="flex items-center border-b-2 border-amber-800 pb-4">
      <FaLock className="text-amber-600 mr-4 text-xl" />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-lg py-3"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="ml-4 text-lg"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>

    {/* Button */}
    <button
      type="submit"
      className="
        w-full
        py-5
        text-xl
        rounded-full
        bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
        text-black
        font-bold
        hover:scale-105
        transition-all duration-300
      "
    >
      SIGN UP
    </button>

  </form>

</div>
 </div>
            {/* Optional login link (currently commented out) */}
            {/*
            <p className="text-center mt-8 text-sm px-4">
              Already have an account?{" "}
              <NavLink to="/login" className="text-amber-600 font-semibold">
                Login
              </NavLink>
            </p>
            */}
          </div>
        </div>
    
    </Layout>
  );
}

export default Home;