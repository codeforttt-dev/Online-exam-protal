import logo from "../assets/logo.jpeg";
import brainvideo from "../assets/brainvideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/thunks/userThunk";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { purchaseExam } from "../redux/thunks/purchaseThunk";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GlobalModal from "../component/ui/GlobalModal";

const HeroSection2 = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // const navItems = [
  //     // { name: "Home", path: "/" },
  //     { name: "Official Website", path: "https://thetruetopper.com/", external: true },
  //     // { name: "Register", },
  // ];
  const dispatch = useDispatch();
  const signupRef = useRef(null);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    whatsapp: "",
    country: "",
    countryCode: "",
    acceptTerms: false
  });
  const [selectedPlan, setSelectedPlan] = useState({
    name: "",
    price: 0
  });

const isFormValid =
  formData.name.trim() !== "" &&
  formData.studentClass !== "" &&
  formData.whatsapp.length >= 10;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;
    // alert("Payment Successful ✅");
    setShowModal(true);
    // navigate("/register");

    // try {
    //   /* ===============================
    //      1️⃣ CREATE ORDER
    //   =============================== */
    //   const order = await dispatch(
    //     createPaymentOrderThunk({ amount: selectedPlan.price })
    //   ).unwrap();

    //   /* ===============================
    //      2️⃣ OPEN RAZORPAY
    //   =============================== */
    //   const options = {
    //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    //     amount: order.amount,
    //     currency: order.currency,
    //     order_id: order.id,

    //     name: "The True Topper",
    //     description: selectedPlan.name,

    //     prefill: {
    //       name: formData.name,
    //       contact: formData.whatsapp,
    //     },

    //     theme: {
    //       color: "#2563eb",
    //     },

    //     /* ===============================
    //        3️⃣ AFTER SUCCESS PAYMENT
    //     =============================== */
    //     handler: async function (response) {
    //       try {
    //         // verify + save guest data
    //         await dispatch(
    //           verifyPaymentThunk({
    //             razorpayOrderId: response.razorpay_order_id,
    //             razorpayPaymentId: response.razorpay_payment_id,
    //             razorpaySignature: response.razorpay_signature,
    //             totalAmount: selectedPlan.price,

    //             // ⭐ send guest details
    //             name: formData.name,
    //             whatsapp: formData.whatsapp,
    //             studentClass: formData.studentClass,
    //             examName: selectedPlan.name
    //           })
    //         ).unwrap();

    //         alert("Payment Successful ✅");
    //         navigate("/thank-you"); // or success page

    //       } catch (err) {
    //         alert("Payment verification failed ❌");
    //       }
    //     },
    //   };

    //   const razor = new window.Razorpay(options);
    //   razor.open();

    // } catch (err) {
    //   alert("Payment failed ❌");
    // }
  };



  const scrollToSignup = () => {
    setShowSignup(true);
  };



  return (
    <div className="min-h-screen bg-[#334155] flex items-center justify-center p-4">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl bg-[#e2e8f0] rounded-[40px] p-12 relative overflow-hidden">

        {/* ================= NAVBAR ================= */}
        <div className="flex justify-between items-center mb-2">
          <img
            src={logo}
            alt="Blunex Logo"
            className="h-20 w-auto object-contain cursor-pointer"
          />

          {/* <div className="bg-white rounded-full px-8 py-3 flex gap-8 shadow-md">
                        {navItems.map((item) =>
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-600 hover:text-black cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <button
                                    key={item.name}
                                    onClick={scrollToSignup}
                                    className="text-sm text-slate-600 hover:text-black cursor-pointer"
                                >
                                    {item.name}
                                </button>
                            )
                        )}
                    </div> */}

        </div>


        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-black leading-tight text-gray-600">
                Welcome to the Universe of<br />
              </h2>
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-blue-600">
                The True Topper<br />
              </h2>

              <p className="text-slate-500 max-w-md mt-2">
                Top The Real Exam
              </p>
              {/* <p className="text-slate-500 max-w-md mt-2">
                Unlock your True Potential Now 
              </p> */}
              {/* <div className="pt-5 flex items-center gap-2">
                                <span className="text-yellow-700 ">If you want to join our universe:</span>
                                <button
                                    onClick={scrollToSignup}
                                    className="bg-slate-800 text-white px-4 py-1 rounded-full shadow-lg hover:scale-105 transition"
                                >
                                    Register here
                                </button>
                            </div> */}
            </div>



            {/* ================= NEW CARDS ================= */}


            {/* ================= NEW CARDS ================= */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 pt-10">

              {/* Card 1 */}
              <a
                href="https://thetruetopper.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-3xl bg-gradient-to-br from-white to-slate-100
  border-2 border-transparent hover:border-blue-500 shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-blue-600 font-bold text-lg mb-3">
                  Know More About Us
                </h3>

                <p
                  className={`
      text-slate-500 text-sm leading-relaxed
      ${expandedCard === 1 ? "" : "line-clamp-2 sm:line-clamp-none"}
    `}
                >
                  Learn more about our mission, values, and terms & conditions.
                  Join us for holistic growth and success.
                </p>

                {/* Read More only on mobile */}
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedCard(expandedCard === 1 ? null : 1);
                  }}
                  className="sm:hidden text-blue-600 text-xs font-semibold cursor-pointer"
                >
                  {expandedCard === 1 ? "Show less" : "Read more"}
                </span>
              </a>




              {/* Card 2 */}
              <div
                onClick={() => {
                  setSelectedPlan({
                    name: "Olampiyard ++",
                    price: 199
                  });
                  scrollToSignup();
                }}
                className="
                  p-4 rounded-3xl bg-gradient-to-br from-white to-slate-100
                  border-2 border-transparent hover:border-blue-500
                  shadow-lg hover:scale-105 transition cursor-pointer
                "
                >
                {/* Title + Price */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-blue-600 font-bold text-sm sm:text-lg">
                    International Ethical Entrepreneurship Olympiad ++ (IEEO++)
                  </h3>

                  {/* <span className="text-green-600 font-bold text-sm sm:text-base">
      ₹199
    </span> */}
                </div>

                {/* Description */}
                <p
                  className={`
                    text-slate-500 text-sm leading-relaxed
                    ${expandedCard === 2 ? "" : "line-clamp-2 sm:line-clamp-none"}
                  `}
                >
                  Click for Registration
                </p>

                {/* Mobile read more */}
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // VERY IMPORTANT (prevents card click)
                    setExpandedCard(expandedCard === 2 ? null : 2);
                  }}
                  className="sm:hidden text-blue-600 text-xs font-semibold cursor-pointer"
                >
                  {expandedCard === 2 ? "Show less" : "Read more"}
                </span>
              </div>

            </div>


          </div>
          {/* ================= RIGHT BRAIN VIDEO ================= */}
          <div className="relative flex justify-center items-center">

            {/* Glow circle */}
            <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-300 to-green-400 rounded-full blur-3xl opacity-40"></div>

            {/* Brain Video */}
            <video
              src={brainvideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-[420px] h-[430px] rounded-3xl object-cover shadow-xl"
            />

          </div>


          <AnimatePresence>
            {showSignup && (
              <motion.div
                ref={signupRef}
                initial={{ y: -120, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -120, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="absolute right-4 top-4 w-[400px] bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200"
              >
                {/* CLOSE */}
                <button
                  onClick={() => setShowSignup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
                >
                  ✕
                </button>

                {/* HEADER */}
                <h2 className="text-l font-bold text-center text-slate-800 mb-2">
                  {isLogin ? "Welcome Back 👋" : "Payment Registration Page for the IEEO ++"}
                </h2>

                {/* =================  FORM ================= */}
                <form onSubmit={handleSignup} className="flex flex-col gap-4">

                  {/* <p className="text-sm text-slate-500 text-center">
                                    Start learning smarter with The True Topper
                                </p> */}
                  {/* <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-xl mb-8">
                                    ⚠️ Important Message: It is mandatory to fill all the details on this page. It is strongly advised to complete it right now itself but if due to any reasons you want to fill this page later  please copy the URL and you can come back and fill it later also.
                                    We have to ensure that if the person loses this URL then still there must be some kind of method through which he can later fill it
                                  </div> */}

                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Full Name *(as in school records / Aadhar card.)
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full mt-1 border border-slate-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                      required
                    />
                  </div>

                  {/* Class */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Class *
                    </label>
                    <select
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleChange}
                      className="w-full mt-1 border border-slate-300 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Whatsapp Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country={"in"}
                      enableSearch
                      value={formData.whatsapp}
                      onChange={(phone, data) =>
                        setFormData({
                          ...formData,
                          whatsapp: phone,
                          country: data.countryCode,
                          countryCode: "+" + data.dialCode
                        })
                      }
                      inputClass="!w-full !px-4 !py-3 !pl-14 !rounded-lg !border-gray-300"
                      containerClass="w-full"
                    />
                    <div className="bg-yellow-50 mt-2 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-xl mb-1">
                      ⚠️ Please fill this WhatsApp number very carefully and keep it in your record as this number will be used for the recovery of your account and all the important updates and communication from The True Topper
                    </div>
                  </div>


                  {/* ================= TERMS ================= */}
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">

                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          acceptTerms: e.target.checked
                        })
                      }
                      className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
                      required
                    />

                    <label className="text-xs text-slate-600 leading-relaxed">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Terms & Conditions
                      </a>{" "}
                      {/* and{" "} */}
                      {/* <a
                        href="/privacy"
                        target="_blank"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Privacy Policy
                      </a> */}
                    </label>
                  </div>



                  {/* ================= SUBMIT ================= */}
                  <button
                    type="submit"
                    disabled={!isFormValid || !formData.acceptTerms}
                    className={`
                        py-2 rounded-xl font-semibold shadow-lg transition
                        ${isFormValid && formData.acceptTerms
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                      `}
                  >
                    Register for Payment
                  </button>


                </form>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
      <GlobalModal
  isOpen={showModal}
  onClose={() => {
    setShowModal(false);
    navigate("/register");
  }}
  title="Congratulations 🎉"
  message="Congratulations you have successfully paid the fee for International Ethical Entrepreneurship Olympiad ++"
  type="success"
/>

    </div>
  );
};

export default HeroSection2;
