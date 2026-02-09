import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../pages/login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import HeroSection2 from "../pages/HeroSection2";
function AppRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<HeroSection2 />} />
      <Route path="/login" element={<Login />} />
     <Route path ="/Signup" element={<Signup/>}/>
     <Route path="/Dashboard"element={<Dashboard/>}/>
    </Routes>
  );
}

export default AppRoutes;