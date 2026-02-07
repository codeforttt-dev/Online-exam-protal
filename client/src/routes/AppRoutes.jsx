import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import FormB from "../pages/formB";
import Question from "../pages/Question";
import AdminDashboard from "../adminpages/adminDashboard";
import OlympiadManagement from "../adminpages/olympaidManagement";
import QuestionBank from "../adminpages/questionBank";
import Participants from "../adminpages/participants";
import ForgotPassword from "../pages/forgotPassword";
function AppRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
     <Route path ="/Signup" element={<Signup/>}/>
     <Route path="/Dashboard"element={<Dashboard/>}/>
     <Route path="/FormB" element={<FormB/>}/>
     <Route path="/Question" element={<Question/>}/>
     <Route path="/admindashboard"element={<AdminDashboard/>}/>
     <Route path="/olympiad-management" element={<OlympiadManagement />} />
     <Route path="/question-Bank" element={<QuestionBank/>}/>
     <Route path="/forgot-password" element={<ForgotPassword />} />

           
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/olympiad-management" element={<OlympiadManagement />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/participants" element={<Participants />} />

        {/*}
        <Route path="/schools" element={<div>Schools Page</div>} />s
        <Route path="/tests" element={<div>Tests Page</div>} />
        <Route path="/results" element={<div>Results & Analytics Page</div>} />
        <Route path="/payments" element={<div>Payments Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/administrators" element={<div>Administrators Page</div>} />
      </Routes>
      */}

    </Routes>
  
  );
}

export default AppRoutes;