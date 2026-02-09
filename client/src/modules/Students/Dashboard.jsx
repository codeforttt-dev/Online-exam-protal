// client/src/modules/Students/Dashboard.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStudentDashboard } from "../../redux/thunks/studentThunk";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const examState = useSelector((state) => state.exam);

  const dashboard = examState?.dashboard || {};
  const dashLoading = examState?.loading;
  const dashError = examState?.error;

  // Dashboard data sirf tab fetch karo jab user + token dono set hon
  useEffect(() => {
    if (token && user) {
      dispatch(fetchStudentDashboard());
    }
  }, [token, user, dispatch]);

  // 1) Token hi nahi -> login page
  if (!token) {
    navigate("/login");
    return null;
  }

  // 2) User slice loading me hai
  if (userLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Checking your session...</p>
      </div>
    );
  }

  // 3) Token hai, par user null (refresh ke baad state reset) -> login pe redirect
  if (!user) {
    navigate("/login");
    return null;
  }

  // 4) Dashboard data loading
  if (dashLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (dashError) {
    return (
      <div className="p-6 text-center text-red-600">
        {dashError}
      </div>
    );
  }

  const registrations = dashboard.registrations || [];
  const results = dashboard.results || [];
  const studyMinutes = dashboard.studyMinutes || 0;
  const upcomingExams = dashboard.upcomingExams || [];
  const resources = dashboard.resources || [];

  return (
    <div className="space-y-5 p-4 md:p-5 lg:p-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl px-5 py-5 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold mb-1">
          Welcome back, {user.name || ""}!
        </h2>
        <p className="text-sm md:text-base text-white/90">
          Username: <span className="font-semibold">{user.username}</span> | Role: {user.role}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {registrations.length}
          </div>
          <p className="text-xs text-gray-600">Total Registrations</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {results.length}
          </div>
          <p className="text-xs text-gray-600">Total Results</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {Math.round(studyMinutes / 60)}
          </div>
          <p className="text-xs text-gray-600">Study Hours (7 days)</p>
        </div>
      </div>

      {/* Registrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Your Registrations</h3>
        {registrations.length === 0 ? (
          <p className="text-sm text-gray-600">
            You have not registered for any exam yet.
          </p>
        ) : (
          <div className="space-y-3">
            {registrations.map((reg) => (
              <div
                key={reg._id}
                className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {reg.exam?.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {reg.exam?.description || "No description"}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold text-gray-800">
                    {reg.paymentStatus}
                  </p>
                  <p className="text-gray-500">
                    {new Date(reg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Upcoming Exams</h3>
        {upcomingExams.length === 0 ? (
          <p className="text-sm text-gray-600">
            No upcoming exams scheduled.
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam._id}
                className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {exam.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {exam.description || "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Study Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Study Resources</h3>
        {resources.length === 0 ? (
          <p className="text-sm text-gray-600">
            No study resources available.
          </p>
        ) : (
          <div className="space-y-3">
            {resources.map((res) => (
              <div
                key={res._id}
                className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {res.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    Type: {res.type}
                    {res.exam ? ` | Exam: ${res.exam.title}` : ""}
                  </p>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-blue-600 underline"
                >
                  Open
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
