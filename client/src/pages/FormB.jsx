import React, { useState, useEffect } from "react";
import { FaHome, FaMap, FaCity, FaMailBulk, FaUser } from "react-icons/fa";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerExamThunk } from "../redux/thunks/formBThunks";
import logo from "../assets/logo.jpeg";

function FormB() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.formB
  );

  const [formData, setFormData] = useState({
    examId: "",
    studentUniqueId: "",
    parentName: "",
    parentPhone: "",
    schoolName: "",
    address: "",
    state: "",
    district: "",
    pinCode: "",
    className: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      examId,
      studentUniqueId,
      parentName,
      parentPhone,
      schoolName,
      address,
      state,
      district,
      pinCode,
      className,
    } = formData;

    if (
      !examId ||
      !studentUniqueId ||
      !parentName ||
      !parentPhone ||
      !schoolName ||
      !address ||
      !state ||
      !district ||
      !pinCode ||
      !className
    ) {
      alert("Please fill all fields");
      return;
    }

    dispatch(registerExamThunk(formData));
  };

  useEffect(() => {
    if (success) {
      alert("Exam Registered Successfully 🎉");
      navigate("/dashboard");
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-bl from-[#fde68a] via-[#fff7e6] to-[#fffaf5]">

      <div className="w-[900px] bg-white shadow-2xl rounded-2xl 
        grid grid-cols-2 overflow-hidden">

        {/* LEFT SIDE FORM */}
        <div className="p-10">

          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-35" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">
            Personal Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <Input icon={<FaUser />} name="examId" placeholder="Exam ID" handleChange={handleChange} />
            <Input icon={<FaUser />} name="studentUniqueId" placeholder="Student Unique ID" handleChange={handleChange} />
            <Input icon={<FaUser />} name="className" placeholder="Class" handleChange={handleChange} />
            <Input icon={<FaUser />} name="parentName" placeholder="Parent Name" handleChange={handleChange} />
            <Input icon={<FaUser />} name="parentPhone" placeholder="Parent Phone" handleChange={handleChange} />
            <Input icon={<FaUser />} name="schoolName" placeholder="School Name" handleChange={handleChange} />
            <Input icon={<FaHome />} name="address" placeholder="Address" handleChange={handleChange} />
            <Input icon={<FaMap />} name="state" placeholder="State" handleChange={handleChange} />
            <Input icon={<FaCity />} name="district" placeholder="District" handleChange={handleChange} />
            <Input icon={<FaMailBulk />} name="pinCode" placeholder="Pin Code" handleChange={handleChange} />

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r 
              from-amber-400 via-yellow-300 to-amber-400
              text-black font-bold py-3 rounded-lg
              hover:scale-105 transition duration-300"
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>

          </form>
        </div>

        {/* RIGHT SIDE SOCIAL PANEL */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 
          flex flex-col items-center justify-center text-white p-10">

          <h2 className="text-3xl font-bold mb-8">
            Connect With Us
          </h2>

          <div className="space-y-6 w-full">

            <SocialButton
              icon={<FaYoutube size={22} />}
              text="YouTube"
              bg="bg-red-600 hover:bg-red-700"
              link="https://youtube.com/@pawanrajput-l7m?si=pX42ykzXrk9C27vj"
            />

            <SocialButton
              icon={<FaFacebook size={22} />}
              text="Facebook"
              bg="bg-blue-600 hover:bg-blue-700"
              link="https://www.facebook.com"
            />

            <SocialButton
              icon={<FaInstagram size={22} />}
              text="Instagram"
              bg="bg-pink-600 hover:bg-pink-700"
              link="https://www.instagram.com"
            />

          </div>

        </div>

      </div>
    </div>
  );
}

/* Reusable Input */
const Input = ({ icon, name, placeholder, handleChange }) => (
  <div className="flex items-center border-b border-gray-400 pb-2">
    <span className="mr-3 text-gray-600">{icon}</span>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full outline-none bg-transparent"
    />
  </div>
);

/* Clickable Social Button */
const SocialButton = ({ icon, text, bg, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-full flex items-center justify-center gap-3 py-3 
    rounded-lg font-semibold transition ${bg}`}
  >
    {icon}
    {text}
  </a>
);

export default FormB;
