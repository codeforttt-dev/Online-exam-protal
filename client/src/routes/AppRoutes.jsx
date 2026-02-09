import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
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