import React from "react";

const Leaderboard = () => {
  const students = [
    { id: 1, name: "Rahul Sharma", school: "Delhi Public School", score: 98 },
    { id: 2, name: "Ananya Verma", school: "St. Xavier School", score: 95 },
    { id: 3, name: "Arjun Singh", school: "Modern Public School", score: 93 },
    { id: 4, name: "Priya Kumari", school: "Bright Future Academy", score: 90 },
    { id: 5, name: "Aman Khan", school: "Green Valley School", score: 88 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          🏆 Leaderboard
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3">Rank</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">School</th>
                <th className="p-3 text-right">Score</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index === 0
                      ? "bg-yellow-100"
                      : index === 1
                      ? "bg-gray-100"
                      : index === 2
                      ? "bg-orange-100"
                      : ""
                  }`}
                >
                  <td className="p-3 font-semibold">
                    {index + 1}
                  </td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.school}</td>
                  <td className="p-3 text-right font-bold text-indigo-600">
                    {student.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;