import logo from "../assets/ttt.jpeg";
import brainvideo from "../assets/brainvideo.mp4";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/thunks/userThunk";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const HeroSection2 = () => {
    const navItems = [
        // { name: "Home", path: "/" },
        { name: "Official Website", path: "https://thetruetopper.com/", external: true },
        { name: "Register", },
    ];
    const dispatch = useDispatch();
    const signupRef = useRef(null);
    const [showSignup, setShowSignup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
            setShowSignup(false);
        }

    };
    const handleLogin = async (e) => {
        e.preventDefault();
        // dispatch(loginUser(loginData))
    };



    const scrollToSignup = () => {
        setShowSignup(true);
    };



    return (
        <div className="min-h-screen bg-[#334155] flex items-center justify-center p-4">

            {/* MAIN CONTAINER */}
            <div className="w-full max-w-7xl bg-[#e2e8f0] rounded-[40px] p-12 relative overflow-hidden">

                {/* ================= NAVBAR ================= */}
                <div className="flex justify-between items-center mb-16">
                    <img
                        src={logo}
                        alt="Blunex Logo"
                        className="h-10 w-auto object-contain cursor-pointer"
                    />

                    <div className="bg-white rounded-full px-8 py-3 flex gap-8 shadow-md">
                        {navItems.map((item) =>
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-600 hover:text-black cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <button
                                    key={item.name}
                                    onClick={scrollToSignup}
                                    className="text-sm text-slate-600 hover:text-black cursor-pointer"
                                >
                                    {item.name}
                                </button>
                            )
                        )}
                    </div>

                </div>


                {/* ================= CONTENT ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* LEFT TEXT */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black leading-tight text-gray-600">
                                Welcome to the Universe of<br />
                            </h2>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight text-blue-600">
                                The True Topper<br />
                            </h2>
                            <p className="text-slate-500 max-w-md mt-2">
                                Driven by intelligence, powered by technology.
                            </p>
                            <div className="pt-5 flex items-center gap-2">
                                <span className="text-yellow-700 ">If you want to join our universe:</span>
                                <button
                                    onClick={scrollToSignup}
                                    className="bg-slate-800 text-white px-4 py-1 rounded-full shadow-lg hover:scale-105 transition"
                                >
                                    Register here
                                </button>
                            </div>
                        </div>



                        {/* ================= NEW CARDS ================= */}


{/* ================= NEW CARDS ================= */}
<div className="grid grid-cols-2 sm:grid-cols-2 gap-6 pt-10">

  {/* Card 1 */}
  <Link
    to="/about-olampiyard"
    className="p-4 rounded-3xl bg-gradient-to-br from-white to-slate-100
    border-2 border-transparent hover:border-blue-500 shadow-lg hover:scale-105 transition"
  >
    <h3 className="text-blue-600 font-bold text-lg mb-3">
      Know More About Us
    </h3>

    <p
      className={`
        text-slate-500 text-sm leading-relaxed
        ${expandedCard === 1 ? "" : "line-clamp-2 sm:line-clamp-none"}
      `}
    >
      Learn more about our mission, values, and terms & conditions.
      Join us for holistic growth and success.
    </p>

    {/* Read More only on mobile */}
    <span
      onClick={(e) => {
        e.preventDefault();
        setExpandedCard(expandedCard === 1 ? null : 1);
      }}
      className="sm:hidden text-blue-600 text-xs font-semibold cursor-pointer"
    >
      {expandedCard === 1 ? "Show less" : "Read more"}
    </span>
  </Link>



  {/* Card 2 */}
  <Link
    to="/Dashboard"
    className="p-4 rounded-3xl bg-gradient-to-br from-white to-slate-100
    border-2 border-transparent hover:border-blue-500 shadow-lg hover:scale-105 transition"
  >
    <h3 className="text-blue-600 font-bold text-lg mb-3">
      Olampiyard ++
    </h3>

    <p
      className={`
        text-slate-500 text-sm leading-relaxed
        ${expandedCard === 2 ? "" : "line-clamp-2 sm:line-clamp-none"}
      `}
    >
      Olympiad++ goes beyond traditional Olympiads,
      measuring both accuracy and confidence in every answer.
    </p>

    <span
      onClick={(e) => {
        e.preventDefault();
        setExpandedCard(expandedCard === 2 ? null : 2);
      }}
      className="sm:hidden text-blue-600 text-xs font-semibold cursor-pointer"
    >
      {expandedCard === 2 ? "Show less" : "Read more"}
    </span>
  </Link>
</div>


                    </div>
                    {/* ================= RIGHT BRAIN VIDEO ================= */}
                    <div className="relative flex justify-center items-center">

                        {/* Glow circle */}
                        <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-300 to-green-400 rounded-full blur-3xl opacity-40"></div>

                        {/* Brain Video */}
                        <video
                            src={brainvideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-[420px] h-[430px] rounded-3xl object-cover shadow-xl"
                        />

                    </div>


                    <AnimatePresence>
                        {showSignup && (
                            <motion.div
                                ref={signupRef}
                                initial={{ y: -120, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -120, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                                className="absolute right-24 top-24 w-[400px] bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200"
                            >
                                {/* CLOSE */}
                                <button
                                    onClick={() => setShowSignup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
                                >
                                    ✕
                                </button>

                                {/* HEADER */}
                                <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
                                    {isLogin ? "Welcome Back 👋" : "Join The True Topper 🚀"}
                                </h2>

                                {/* ================= LOGIN FORM ================= */}
                                {isLogin ? (
                                    /* ================= LOGIN ================= */
                                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                                        <p className="text-sm text-slate-500 text-center -mt-2">
                                            Login to explore our universe
                                        </p>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="@username"
                                                onChange={handleChange}
                                                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                                required
                                            />
                                            <p className="text-xs text-slate-400 mt-1">
                                                Enter your unique login ID
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleChange}
                                                className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                                required
                                            />
                                            <p className="text-xs text-slate-400 mt-1">
                                                Keep your account secure
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                                        >
                                            Login
                                        </button>

                                        <p className="text-sm text-center text-slate-500">
                                            Don’t have an account?{" "}
                                            <span
                                                onClick={() => setIsLogin(false)}
                                                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                                            >
                                                Create Account
                                            </span>
                                        </p>
                                        <p className="text-sm text-center text-slate-500">
                                           
                                            <span
                                                onClick={() => setIsLogin(false)}
                                                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                                            >
                                                Forgot password
                                            </span>
                                        </p>
                                    </form>
                                ) : (
                                    /* ================= SIGNUP ================= */
                                    <form onSubmit={handleSignup} className="flex flex-col gap-1">

                                        <p className="text-sm text-slate-500 text-center -mt-2">
                                            Start learning smarter with The True Topper
                                        </p>

                                        {/* Full Name */}
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="name"
                                                onChange={handleChange}
                                                className="w-full mt-1 border border-slate-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                                required
                                            />
                                        </div>

                                        {/* Username */}
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="username"
                                                onChange={handleChange}
                                                className="w-full mt-1 border border-slate-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                                required
                                            />
                                            <p className="text-xs text-slate-400 mt-1">
                                                This will be your login ID
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="student@email.com"
                                                onChange={handleChange}
                                                className="w-full mt-1 border border-slate-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                                required
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Minimum 8 characters"
                                                onChange={handleChange}
                                                className="w-full mt-1 border border-slate-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                                required
                                            />
                                            <p className="text-xs text-slate-400 mt-1">
                                                Use letters + numbers for strong security
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                                        >
                                            Create Account
                                        </button>

                                        <p className="text-sm text-center text-slate-500">
                                            Already have an account?{" "}
                                            <span
                                                onClick={() => setIsLogin(true)}
                                                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                                            >
                                                Login
                                            </span>
                                        </p>

                                        <p className="text-[11px] text-center text-slate-400">
                                            By signing up you agree to our Terms & Privacy Policy
                                        </p>
                                    </form>
                                )}

                            </motion.div>
                        )}
                    </AnimatePresence>




                </div>

            </div>
        </div>
    );
};

export default HeroSection2;
