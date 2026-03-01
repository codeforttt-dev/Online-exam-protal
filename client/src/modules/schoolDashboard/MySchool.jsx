import React from "react";

const MySchool = () => {
  return (
    <div className="min-h-screen max-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* ================= SCHOOL PROFILE CARD ================= */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h2 className="text-base font-semibold text-gray-700">
              My School Profile
            </h2>

            <button className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">

            {/* Logo */}
            <img
              src="https://via.placeholder.com/120"
              alt="School Logo"
              className="w-28 h-28 rounded-lg border object-cover"
            />

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm w-full">

              <div>
                <p className="text-gray-500">School Name</p>
                <p className="font-medium text-gray-800">
                  Green Valley Public School
                </p>
              </div>

              <div>
                <p className="text-gray-500">School Code</p>
                <p className="font-medium text-gray-800">GVPS2026</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-800">
                  info@gvpschool.com
                </p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">
                  +91 9876543210
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-500">Address</p>
                <p className="font-medium text-gray-800">
                  Electronic City, Bengaluru, Karnataka
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ================= SCHOOL STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500">Total Students</p>
            <h3 className="text-lg font-semibold text-indigo-600">
              1250
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500">Total Teachers</p>
            <h3 className="text-lg font-semibold text-green-600">
              65
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500">School Overall Rank</p>
            <h3 className="text-lg font-semibold text-yellow-600">
              #12 in State
            </h3>
          </div>

        </div>

        {/* ================= TOP RANKER SECTION ================= */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Top Ranker of This School
          </h3>

          <div className="flex items-center gap-5">

            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Top Student"
              className="w-20 h-20 rounded-full border object-cover"
            />

            <div>
              <p className="text-base font-semibold text-gray-800">
                Aarav Sharma
              </p>
              <p className="text-sm text-gray-500">
                Class 10 • Roll No: 1023
              </p>
              <p className="text-sm text-indigo-600 font-medium mt-1">
                Scored 99.8% in Olympiad 2026
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MySchool;