import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/userThunk";
import logo from "../assets/logo.jpeg";
import Layout from "../component/layout/Layout";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

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
    await dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-bl from-[#fff7db] via-[#ffe9a8] to-[#ffd86b]">

        {/* Bigger Card */}
        <div className="relative z-10 w-[95%] sm:w-[480px] px-12 py-14 
          border-2 border-yellow-500 rounded-2xl 
          bg-[#fff8e1] shadow-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-[240px] h-[120px] object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-12">
            LOGIN
          </h2>

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div className="mb-8 flex items-center border-b border-yellow-400 pb-3">
              <FaEnvelope className="mr-3 text-lg" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg"
              />
            </div>

            {/* Password */}
            <div className="mb-3 flex items-center border-b border-yellow-400 pb-3">
              <FaLock className="mr-3 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Forget Password */}
          <div className="text-right mb-8">
  <NavLink
    to="/forgot-password"
    className="text-xl font-semibold text-yellow-700 hover:underline"
  >
    Forgot Password?
  </NavLink>
</div>

            <button
              type="submit"
              className="w-full bg-yellow-400 font-bold py-4 text-lg rounded-xl hover:bg-yellow-500 transition"
            >
              LOGIN
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
