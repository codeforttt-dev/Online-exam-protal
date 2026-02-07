// src/pages/Login.jsx (ya jahan bhi hai)
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/userThunk";
import logo from "../assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.user);

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
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-bl from-[#fff7db] via-[#ffe9a8] to-[#ffd86b]">
      <div className="relative z-10 w-[420px] px-10 py-12 border-2 border-yellow-500 rounded-2xl bg-[#fff8e1] shadow-xl">
        <div className="flex justify-right mb-5">
          <img src={logo} alt="Logo" className="w-30 h-28 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">LOGIN</h2>

        {error && (
          <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-8 flex items-center border-b border-yellow-400 pb-2">
            <FaEnvelope className="mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="mb-8 flex items-center border-b border-yellow-400 pb-2">
            <FaLock className="mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginData.password}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 font-bold py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
