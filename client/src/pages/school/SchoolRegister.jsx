import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerSchool } from "../../redux/thunks/school/schoolThunk";
import { resetSchoolState } from "../../redux/slices/school/schoolSlice";

function SchoolRegister() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.school
  );

  const [formData, setFormData] = useState({
    name: "",
    principalName: "",
    email: "",
    password: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerSchool(formData));
  };

  // Handle success state properly
  useEffect(() => {
    if (success) {
      alert("School Registered Successfully 🎉");

      setFormData({
        name: "",
        principalName: "",
        email: "",
        password: "",
        mobile: ""
      });

      dispatch(resetSchoolState());
    }
  }, [success, dispatch]);

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

        <h2 className="text-3xl font-bold mb-6">
          Join The True Topper Network 🏫
        </h2>

        <p className="text-blue-100 mb-6 leading-relaxed">
          Register your school and empower your students to participate
          in International Ethical Entrepreneurship Olympiad ++.
        </p>

        <ul className="space-y-4 text-sm">
          <li>✔ Get dedicated school dashboard</li>
          <li>✔ Track student performance</li>
          <li>✔ Improve school ranking</li>
          <li>✔ Access detailed analytics</li>
        </ul>

        <div className="mt-10 text-blue-200 text-sm">
          © 2026 The True Topper
        </div>
      </div>

      {/* ================= RIGHT SIDE (FORM) ================= */}
      <div className="flex items-center justify-center p-8 md:p-12">

        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            School Registration
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill in your school details to get started
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="School Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />

            <input
              type="text"
              name="principalName"
              placeholder="Principal Name"
              value={formData.principalName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="School Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />

            <input
              type="text"
              name="mobile"
              placeholder="School Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              {loading ? "Registering..." : "Register School"}
            </button>

          </form>

        </div>

      </div>

    </div>
  </div>
);
}

export default SchoolRegister;