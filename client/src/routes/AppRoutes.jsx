import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import Signup from "../pages/Signup";
function AppRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
     <Route path ="/Signup" element={<Signup/>}/>
    </Routes>
  );
}

export default AppRoutes;