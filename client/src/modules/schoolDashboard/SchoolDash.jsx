import React from "react";

const SchoolDash = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Schools", value: "6000", color: "border-pink-400", icon: "🏫" },
          { title: "Students", value: "25000", color: "border-purple-500", icon: "🎓" },
          { title: "Teachers", value: "3500", color: "border-yellow-400", icon: "👩‍🏫" },
          { title: "Parents", value: "11020", color: "border-green-500", icon: "👨‍👩‍👧" },
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 border-l-4 ${item.color}`}
          >
            <div className="text-xl">{item.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{item.title}</p>
              <h2 className="text-lg font-semibold text-gray-800">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* -------- Top 5 School -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Top 5 School Performers
          </h3>

          <ul className="space-y-2">
            {["Green Valley", "Bright Future", "Sunrise Public", "Modern High", "Oxford Public"].map((school, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded text-sm"
              >
                <span className="text-gray-600">
                  {index + 1}. {school}
                </span>
                <span className="text-indigo-600 font-medium">
                  {95 - index}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- Top 5 Students -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Top 5 Students Performers
          </h3>

          <ul className="space-y-2">
            {["Aman", "Priya", "Rahul", "Sneha", "Arjun"].map((student, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded text-sm"
              >
                <span className="text-gray-600">
                  {index + 1}. {student}
                </span>
                <span className="text-green-600 font-medium">
                  {99 - index}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- School Types -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            School Types
          </h3>

          {[
            { name: "Govt School", percent: 90, color: "bg-purple-500" },
            { name: "Private School", percent: 65, color: "bg-yellow-400" },
            { name: "Average School", percent: 80, color: "bg-green-500" },
          ].map((type, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-xs mb-1 text-gray-600">
                <span>{type.name}</span>
                <span className="font-medium">{type.percent}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 ${type.color} rounded`}
                  style={{ width: `${type.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Official Notifications
        </h3>

        <div className="space-y-3">
          {[
            { title: "Olympiad Registration Open", date: "10 Feb 2026" },
            { title: "Ranking Update Released", date: "05 Feb 2026" },
            { title: "New Exam Schedule", date: "01 Feb 2026" },
          ].map((note, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2 text-sm"
            >
              <div>
                <p className="text-gray-700">{note.title}</p>
                <p className="text-xs text-gray-400">{note.date}</p>
              </div>
              <button className="text-indigo-500 text-xs hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SchoolDash;