// src/components/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MainLayout from "../component/layout/Layout";

import Dashboard from "../modules/Students/Dashboard";
import Olympiads from "../modules/Students/Olympiads";
import PracticeTests from "../modules/Students/PracticeTests";
import PracticeTestExamPage from "../pages/PracticeTestExamPage";
import PracticeTestReviewPage from "../modules/Students/PracticeTestReview"; // 🆕 REVIEW PAGE
import Results from "../modules/Students/Results";
import StudyMaterials from "../modules/Students/StudyMaterials";
import Leaderboard from "../modules/Students/Leaderboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Routes with Sidebar */}
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="olympiads" element={<Olympiads />} />

        {/* Practice Test list */}
        <Route path="practice-tests" element={<PracticeTests />} />

        {/* Exam screen */}
        <Route
          path="practice-tests/:id"
          element={<PracticeTestExamPage />}
        />

        {/* 🆕 Result / Review screen */}
        <Route
          path="practice-tests/:id/review"
          element={<PracticeTestReviewPage />}
        />

        <Route path="results" element={<Results />} />
        <Route path="study-materials" element={<StudyMaterials />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
