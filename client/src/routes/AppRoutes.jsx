// src/components/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../component/layout/Layout";
import Dashboard from "../modules/Students/Dashboard";
import Olympiads from "../modules/Students/Olympiads";
import PracticeTests from "../modules/Students/PracticeTests";
import Results from "../modules/Students/Results";
import StudyMaterials from "../modules/Students/StudyMaterials";
import Leaderboard from "../modules/schoolDashboard/Leaderboard";
import Register from "../pages/students/Register";
import ExamsSalesDboard from "../pages/students/ExamsSalesDboard";

// School
import SchoolRegister from "../pages/school/SchoolRegister";
import SchoolDash from "../modules/schoolDashboard/SchoolDash";
import SchoolLayout from "../component/schoolDashboardLayout/schoolLayout";
import MySchool from "../modules/schoolDashboard/MySchool";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<ExamsSalesDboard />} />
      <Route path="/register" element={<Register />} />

      {/* ================= SCHOOL PUBLIC ================= */}
      <Route path="/school/register" element={<SchoolRegister />} />

      {/* ================= SCHOOL DASHBOARD WITH SIDEBAR ================= */}
      <Route path="/school" element={<SchoolLayout />}>
        <Route path="dashboard" element={<SchoolDash />} />
        <Route path="leaderboard" element={<Leaderboard />} />
         <Route path="my-school" element={<MySchool />} />
      </Route>

      {/* ================= STUDENT DASHBOARD ================= */}
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="olympiads" element={<Olympiads />} />
        <Route path="practice-tests" element={<PracticeTests />} />
        <Route path="results" element={<Results />} />
        <Route path="study-materials" element={<StudyMaterials />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default AppRoutes;