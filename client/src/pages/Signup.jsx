import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/thunks/userThunk";
import logo from "../assets/logo.jpeg";
import Layout from "../component/layout/Layout";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  // ✅ only required fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle signup
  const handleSignup = async (e) => {
    e.preventDefault(); // ✅ stop refresh

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
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-bl from-[#fde68a] via-[#fff7e6] to-[#fffaf5] relative overflow-hidden">

      <div className="relative z-10 w-[420px] px-10 py-12 border-2 border-yellow-400 rounded-xl">

        <div className="flex justify-right mb-5">
          <img src={logo} alt="Logo" className="w-30 h-30 object-contain" />
        </div>

        <h2 className="flex justify-center text-xl font-bold mb-10 text-gray-800">
          Create an account
        </h2>

        {/* ✅ FORM START */}
        <form onSubmit={handleSignup}>

          {/* Name */}
          <div className="mb-8 flex items-center border-b border-amber-900 pb-2">
            <FaUser className="text-amber-500 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Username */}
          <div className="mb-8 flex items-center border-b border-amber-900 pb-2">
            <FaUser className="text-amber-500 mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-8 flex items-center border-b border-amber-900 pb-2">
            <FaEnvelope className="text-amber-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-8 flex items-center border-b border-amber-900 pb-2">
            <FaLock className="text-amber-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r 
            from-amber-400 via-yellow-300 to-amber-400
            text-black font-bold py-3 rounded-lg"
          >
            SIGN UP
          </button>

        </form>
        {/* ✅ FORM END */}

        <p className="text-center mt-8 text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-amber-600 font-semibold">
            Login
          </NavLink>
        </p>

      </div>
    </div>
     </Layout>
  );
}

export default Signup;
