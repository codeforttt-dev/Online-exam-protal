import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

        {/* Blur Effects */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] 
          bg-gradient-to-br from-yellow-300/40 to-amber-400/40 
          rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] 
          bg-gradient-to-br from-amber-300/40 to-yellow-400/40 
          rounded-full blur-3xl" />

        {/* Main Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center
          min-h-screen px-6 md:px-24 gap-10 md:gap-16">

          {/* LEFT SIDE */}
          <div className="
            relative
            backdrop-blur-2xl
            bg-yellow-100/70
            border border-yellow-200
            rounded-[30px] md:rounded-[60px]
            p-8 sm:p-12 md:p-24
            shadow-2xl
            w-full md:w-[85%]
            max-w-6xl
            space-y-8 md:space-y-12
          ">

            <h2 className="
              text-2xl md:text-5xl
              font-extrabold
              text-gray-900
              leading-tight
            ">
              The International
              <span className="block mt-3 md:mt-4">
                Unconventional{" "}
                <span className="text-orange-500">
                  Olympiads ++
                </span>
              </span>
            </h2>

            <p className="
              text-base sm:text-lg md:text-2xl
              leading-relaxed md:leading-[1.8]
              text-gray-800
              max-w-4xl
            ">
              Explore The International Unconventional Olympiads ++.
              A global platform for creative minds to compete in non-traditional
              challenges promoting critical thinking and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4 md:mt-6">

              <button
                onClick={() => navigate("/login")}
                className="
                  px-6 sm:px-10 md:px-12
                  py-3 md:py-4
                  text-base sm:text-lg md:text-xl
                  rounded-full
                  bg-blue-200
                  text-gray-900
                  font-semibold
                  shadow-md
                  hover:bg-blue-300
                  transition-all duration-300
                  w-full sm:w-auto
                "
              >
                Login
              </button>

              <button
                className="
                  px-6 sm:px-10 md:px-12
                  py-3 md:py-4
                  text-base sm:text-lg md:text-xl
                  rounded-full
                  border border-orange-400
                  text-orange-600
                  font-semibold
                  hover:bg-orange-400
                  hover:text-white
                  transition-all duration-300
                  w-full sm:w-auto
                "
              >
                Learn More
              </button>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center md:justify-end">
            <div className="
              relative z-10
              w-[95%] md:w-[70%]
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
              <div className="flex justify-center mt-2 mb-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-[180px] h-[180px] md:w-[340px] md:h-[340px] object-contain"
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
                Create an Account
              </h2>

              <form onSubmit={handleSignup} className="space-y-8">

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

        </div>
      </div>
    </Layout>
  );
}

export default Home;
