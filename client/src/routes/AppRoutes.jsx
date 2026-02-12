// src/components/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
import MainLayout from "../component/layout/Layout";
import Dashboard from "../modules/Students/Dashboard";
import Olympiads from "../modules/Students/Olympiads";
import PracticeTests from "../modules/Students/PracticeTests";
import Results from "../modules/Students/Results";
import StudyMaterials from "../modules/Students/StudyMaterials";
import Leaderboard from "../modules/Students/Leaderboard";
import HeroSection2 from "../pages/HeroSection2";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes (without sidebar) */}
      <Route path="/" element={<HeroSection2 />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/register" element={<Register />} />
      {/* Protected/Student Routes (with MainLayout sidebar) */}
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="olympiads" element={<Olympiads />} />
        <Route path="practice-tests" element={<PracticeTests />} />
        <Route path="results" element={<Results />} />
        <Route path="study-materials" element={<StudyMaterials />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
      
      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;