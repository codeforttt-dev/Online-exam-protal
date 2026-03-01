import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const yu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // School name receive from registration page
  const schoolName = location.state?.schoolName || "Your School";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          yu pages .......... 🎉
        </h2>

        <p className="text-gray-600 mb-4">
          <span className="font-semibold text-indigo-600">{schoolName}</span> has been registered successfully.
        </p>

        <p className="text-gray-500 text-sm mb-6">
          You can now login and access your School Dashboard.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/school/login")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default yu;