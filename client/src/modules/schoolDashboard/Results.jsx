import React from "react";

const Results = () => {
  const resultData = {
    studentName: "Rahul Sharma",
    class: "Class 8",
    exam: "National Olympiad 2026",
    totalMarks: 500,
    obtainedMarks: 435,
    subjects: [
      { subject: "Mathematics", marks: 95 },
      { subject: "Science", marks: 90 },
      { subject: "English", marks: 85 },
      { subject: "Reasoning", marks: 88 },
      { subject: "General Knowledge", marks: 77 },
    ],
  };

  const percentage = ((resultData.obtainedMarks / resultData.totalMarks) * 100).toFixed(2);
  const grade =
    percentage >= 90
      ? "A+"
      : percentage >= 80
      ? "A"
      : percentage >= 70
      ? "B"
      : percentage >= 60
      ? "C"
      : "D";

  const status = percentage >= 40 ? "Pass" : "Fail";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          📊 Exam Result
        </h1>

        {/* Student Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 text-gray-700">
          <p><strong>Student Name:</strong> {resultData.studentName}</p>
          <p><strong>Class:</strong> {resultData.class}</p>
          <p><strong>Exam:</strong> {resultData.exam}</p>
          <p><strong>Total Marks:</strong> {resultData.totalMarks}</p>
          <p><strong>Obtained Marks:</strong> {resultData.obtainedMarks}</p>
          <p><strong>Percentage:</strong> {percentage}%</p>
          <p>
            <strong>Grade:</strong> 
            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
              {grade}
            </span>
          </p>
          <p>
            <strong>Status:</strong> 
            <span
              className={`ml-2 px-3 py-1 rounded text-white ${
                status === "Pass" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {status}
            </span>
          </p>
        </div>

        {/* Subject-wise Marks Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-right">Marks</th>
              </tr>
            </thead>
            <tbody>
              {resultData.subjects.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.subject}</td>
                  <td className="p-3 text-right font-semibold text-indigo-600">
                    {item.marks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Download Result
          </button>
        </div>

      </div>
    </div>
  );
};

export default Results;

