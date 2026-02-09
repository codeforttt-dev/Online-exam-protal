import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../redux/thunks/emailThunks";
import Layout from "../component/layout/Layout";
import Footer from "../component/layout/Footer";

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successMessage, error } = useSelector(
    (state) => state.email
  );

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password }));
  };

  return (
    <Layout>   
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="w-[400px] bg-white p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-6 flex items-center border-b pb-2">
            <FaLock className="mr-3 text-yellow-600" />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 py-3 rounded-lg font-bold"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {successMessage && (
          <p className="text-green-600 mt-4 text-center">
            {successMessage}
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-4 text-center">
            {error}
          </p>
        )}

      </div>
      
    </div>
    <Footer />
    </Layout>

  );
}

export default ResetPassword;
