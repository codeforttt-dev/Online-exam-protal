import React from "react";
import FrontNavbar from "../component/layout/FrontNavbar";
<<<<<<< HEAD
=======
import heroVideo from "../assets/hero-video.mp4";

>>>>>>> 2a26ad3f0786e994ca267dca2cd9d8be8016f8d6

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden 
<<<<<<< HEAD
      bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">

      {/* Premium Soft Gradient Blobs */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] 
        bg-gradient-to-br from-pink-300/40 to-yellow-300/40 
=======
      bg-gradient-to-bl from-[#fff8dc] via-[#ffe9a8] to-[#ffd86b]">

      {/* Soft Golden Blobs */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] 
        bg-gradient-to-br from-yellow-300/40 to-amber-400/40 
>>>>>>> 2a26ad3f0786e994ca267dca2cd9d8be8016f8d6
        rounded-full blur-3xl -z-10 animate-pulse">
      </div>

      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] 
<<<<<<< HEAD
        bg-gradient-to-br from-orange-300/40 to-rose-300/40 
=======
        bg-gradient-to-br from-amber-300/40 to-yellow-400/40 
>>>>>>> 2a26ad3f0786e994ca267dca2cd9d8be8016f8d6
        rounded-full blur-3xl -z-10">
      </div>

      {/* Navbar */}
      <FrontNavbar />

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 items-center 
        px-10 md:px-24 py-20">

        {/* Left Content */}
        <div className="space-y-6">

<<<<<<< HEAD
          <h2 className="text-7xl font-bold 
            bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 
            bg-clip-text text-transparent drop-shadow-sm">
            Online Test
          </h2>

          <p className="text-gray-900 text-xl leading-relaxed max-w-lg">
            Practice exams, test your knowledge, and improve your skills 
            with our premium interactive learning platform.
             Practice exams, test your knowledge, and improve your skills 
            with our premium interactive learning platform.
             Practice exams, test your knowledge, and improve your skills 
            with our premium interactive learning platform.
          </p>

          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full 
              bg-gradient-to-r from-red-500 to-pink-500 
              text-white font-semibold shadow-lg 
              hover:scale-105 hover:shadow-xl 
              transition duration-300">
              Get Started
            </button>

            <button className="px-8 py-3 rounded-full 
              border border-red-400 text-red-500 
              hover:bg-red-500 hover:text-white 
=======
          <h2 className="text-4xl font-bold 
            bg-gradient-to-r from-gray-900  to-orange-500 
            bg-clip-text text-transparent drop-shadow-sm">
            The International Unconventional Olympaids ++
          </h2>

          <p className="text-gray-900 text-xl leading-relaxed max-w-lg">
            Explore The International Unconventional Olympiads ++ .
             A global platform for creative minds to compete in non-traditional challenges promoting critical thinking and innovation.
          </p>

          <div className="flex gap-4">
       
            
            <button className="px-8 py-3 rounded-full gap-5
              bg-gradient-to-r from-blue-200 to-blue-200 
              text-black font-semibold shadow-lg 
              hover:scale-105 hover:shadow-xl 
              transition duration-300">
          Login
            </button>

            <button className="px-8 py-3 rounded-full 
              border border-yellow-600 text-yellow-700 
              hover:bg-yellow-500 hover:text-black 
>>>>>>> 2a26ad3f0786e994ca267dca2cd9d8be8016f8d6
              transition duration-300">
              Learn More
            </button>
          </div>

        </div>

<<<<<<< HEAD
        {/* Right Animated Image */}
        <div className="mt-12 md:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r 
              from-pink-200 to-yellow-200 rounded-full 
              blur-2xl opacity-60 animate-pulse">
            </div>

            <img
              src="https://illustrations.popsy.co/amber/digital-nomad.svg"
              alt="Illustration"
              className="relative w-[95%] animate-float"
            />
          </div>
        </div>
=======
       {/* Right Video */}
<div className="mt-12 md:mt-0 flex justify-end -mr-10 md:-mr-24"> 
   <div className="relative">

    <div className="absolute inset-0 bg-gradient-to-r 
      from-yellow-200 to-amber-300 rounded-2xl 
      blur-2xl opacity-60 animate-pulse">
    </div>

    <video
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      className="relative w-[95%] rounded-2xl shadow-xl"
    ></video>

  </div>
</div>
>>>>>>> 2a26ad3f0786e994ca267dca2cd9d8be8016f8d6

      </div>
    </div>
  );
}

export default Home;
