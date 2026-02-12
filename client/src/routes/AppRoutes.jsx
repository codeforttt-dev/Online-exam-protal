import { Routes, Route, Navigate } from "react-router-dom";
// Public pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
import MainLayout from "../component/layout/Layout";

// Student layout + components
import StudentLayout from "../component/Student-layout/Layout";
import Dashboard from "../modules/Students/Dashboard";
import Olympiads from "../modules/Students/Olympiads";
import PracticeTests from "../modules/Students/PracticeTests";
import PracticeTestExamPage from "../pages/PracticeTestExamPage";
import PracticeTestReviewPage from "../modules/Students/PracticeTestReview";
import Results from "../modules/Students/Results";
import StudyMaterials from "../modules/Students/StudyMaterials";
import Leaderboard from "../modules/Students/Leaderboard";
import HeroSection2 from "../pages/HeroSection2";
import Register from "../pages/Register";

// Protected wrapper
import ProtectedRoute from "../protected/protectedRouter";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      {/* Public Routes (without sidebar) */}
      <Route path="/" element={<HeroSection2 />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/register" element={<Register />} />
      {/* Protected/Student Routes (with MainLayout sidebar) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* =============== STUDENT ROUTES (protected) =============== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="olympiads" element={<Olympiads />} />
          <Route path="practice-tests" element={<PracticeTests />} />
          <Route path="practice-tests/:id" element={<PracticeTestExamPage />} />
          <Route
            path="practice-tests/:id/review"
            element={<PracticeTestReviewPage />}
          />
          <Route path="results" element={<Results />} />
          <Route path="study-materials" element={<StudyMaterials />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Route>

      {/* ================= Fallback ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
