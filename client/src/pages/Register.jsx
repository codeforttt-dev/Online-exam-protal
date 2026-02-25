import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser, checkUsername } from "../redux/thunks/userThunk";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { useMemo } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CreatableSelect from "react-select/creatable";
import GlobalModal from "../component/ui/GlobalModal";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { checkPurchaseThunk } from "../redux/thunks/purchaseThunk";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { fetchSchools } from "../redux/thunks/school/schoolThunk";

function Register() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [isIndian, setIsIndian] = useState(true);
  const [isSchoolIndian, setIsSchoolIndian] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const checkedUsernames = useRef({});

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    studentClass: "",

    username: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    disability: "no",
    country: "",
    countryCode: "",
    state: "",
    pincode: "",
    mobile: "",

    email: "",
    district: "",
    address: "",

    school: "",
    schoolCountry: "IN",
    schoolState: "",
    schoolDistrict: "",
    schoolPincode: "",

    fatherName: "",
    fatherMobile: "",
    fatherEmail: "",
    fatherProfession: "",
    motherName: "",
    motherMobile: "",
    motherEmail: "",
    motherProfession: "",

    siblings: [],
    siblingCount: 0,

    socialChecks: {
      youtube: false,
      instagram: false,
      facebook: false,
      telegram: false,
      whatsapp: false
    },

    acceptTerms: false
  });


  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        name: location.state.name || "",
        whatsapp: location.state.whatsapp || "",
        studentClass: location.state.studentClass || ""
      }));
    }
  }, [location]);
  useEffect(() => {
    const username = formData.username;

    if (!username || username.length < 3) return;

    if (checkedUsernames.current[username]) return;

    const timer = setTimeout(() => {
      dispatch(checkUsername(username));
      checkedUsernames.current[username] = true;
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username, dispatch]);

  useEffect(() => {
    if (isIndian) {
      setFormData(prev => ({
        ...prev,
        country: "IN",
        countryCode: "+91"
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        country: "",
        countryCode: ""
      }));
    }
  }, [isIndian]);
  useEffect(() => {
  dispatch(fetchSchools());
}, [dispatch]);

const { schools } = useSelector((state) => state.school);

  // useEffect(() => {
  //   if (location.state) {
  //     setFormData(prev => ({
  //       ...prev,
  //       name: location.state.name || "",
  //       whatsapp: location.state.whatsapp || "",
  //       studentClass: location.state.studentClass || ""
  //     }));
  //   }
  // }, [location]);
  const { usernameAvailable, usernameChecking } = useSelector(
    (state) => state.user
  );

  const handleStepClick = async (index) => {
    // ❌ Prevent jumping forward
    if (index > step) return;

    // 🔐 If leaving Step 0 → verify purchase
    if (step === 0 && index === 1) {
      try {
        const res = await dispatch(
          checkPurchaseThunk({
            name: formData.name,
            whatsapp: formData.whatsapp
          })
        ).unwrap();

        localStorage.setItem("purchaseId", res.purchaseId);

        setStep(1);
      } catch (err) {
        alert("First you have to purchase the exam.");
      }

      return;
    }

    // ✅ Allow backward movement
    setStep(index);
  };
  const handleContinue = async () => {

    // If first step → verify purchase
    if (step === 0) {

      if (!formData.name || !formData.whatsapp) {
        alert("Please enter Name and WhatsApp number.");
        return;
      }

      try {
        const res = await dispatch(
          checkPurchaseThunk({
            name: formData.name,
            whatsapp: formData.whatsapp.replace(/\D/g, "")
          })
        ).unwrap();

        localStorage.setItem("purchaseId", res.purchaseId);

        setStep(1);

      } catch (err) {
        alert("No purchase found with this Name and WhatsApp number.");
      }

      return;
    }

    // Other steps → normal move
    setStep(step + 1);
  };


  const countries = useMemo(() => {
    return Country.getAllCountries().map(c => ({
      value: c.isoCode,
      label: c.name,
      phone: c.phonecode
    }));
  }, []);

  const states = useMemo(() => {
    if (!isIndian) return [];

    return State.getStatesOfCountry("IN").map(s => ({
      value: s.isoCode,
      label: s.name
    }));
  }, [isIndian]);


  const schoolStates = useMemo(() => {
    if (!formData.schoolCountry) return [];

    return State.getStatesOfCountry(formData.schoolCountry).map(s => ({
      value: s.isoCode,
      label: s.name
    }));
  }, [formData.schoolCountry]);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();

    if (age < 3 || age > 25) {
      alert("Please enter valid student age (3-25 years)");
      return;
    }
    if (usernameAvailable === false) {
      alert("Username already taken ❌");
      return;
    }

    if (usernameAvailable === null) {
      alert("Please verify username availability first.");
      return;
    }
    const payload = {
      purchaseId: localStorage.getItem("purchaseId"),

      name: formData.name,
      username: "@" + formData.username.toLowerCase(),
      password: formData.password,
      email: formData.email,
      gender: formData.gender,
      disability: formData.disability,
      mobile: formData.mobile.startsWith("+")
        ? formData.mobile
        : "+" + formData.mobile,

      whatsapp: formData.whatsapp.replace(/\D/g, ""),

      studentClass: formData.studentClass,
      dob: formData.dob,

      state: formData.state,
      district: formData.district,
      pincode: formData.pincode,
      address: formData.address,

      school: formData.school,
      schoolCountry: formData.schoolCountry,
      schoolState: formData.schoolState,
      schoolDistrict: formData.schoolDistrict,
      schoolPincode: formData.schoolPincode,

      fatherName: formData.fatherName,
      fatherMobile: formData.fatherMobile?.startsWith("+")
        ? formData.fatherMobile
        : "+" + formData.fatherMobile,
      fatherEmail: formData.fatherEmail,
      fatherProfession: formData.fatherProfession,

      motherName: formData.motherName,
      motherMobile: formData.motherMobile?.startsWith("+")
        ? formData.motherMobile
        : "+" + formData.motherMobile,

      motherEmail: formData.motherEmail,
      motherProfession: formData.motherProfession,

      siblings: formData.siblings
    };
    try {
      // console.log("FINAL PAYLOAD:", payload);
      await dispatch(signupUser(payload)).unwrap();
      localStorage.removeItem("purchaseId");
      alert("Registration Completed 🎉");
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        dob: "",

        country: "",
        countryCode: "",
        state: "",
        district: "",
        pincode: "",
        address: "",
        mobile: "",
        whatsapp: "",

        email: "",
        studentClass: "",

        school: "",
        schoolCountry: "IN",
        schoolState: "",
        schoolDistrict: "",
        schoolPincode: "",

        fatherName: "",
        fatherMobile: "",
        fatherEmail: "",
        fatherProfession: "",
        motherName: "",
        motherMobile: "",
        motherEmail: "",
        motherProfession: "",

        siblings: [],
        siblingCount: 0,

        socialChecks: {
          youtube: false,
          instagram: false,
          facebook: false,
          telegram: false,
          whatsapp: false
        },

        acceptTerms: false
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err || "Registration failed");
    }
  };

  const handleSiblingCount = (count) => {
    const arr = Array.from({ length: count }, () => ({
      name: "",
      dob: "",
      class: "",
      school: ""
    }));
    setFormData({ ...formData, siblingCount: count, siblings: arr });
  };

  const handleSiblingChange = (index, field, value) => {
    const updated = [...formData.siblings];
    updated[index][field] = value;
    setFormData({ ...formData, siblings: updated });
  };

  const schoolOptions = [
    { value: "Delhi Public School", label: "Delhi Public School" },
    { value: "Kendriya Vidyalaya", label: "Kendriya Vidyalaya" },
    { value: "National Public School", label: "National Public School" },
    { value: "St. Mary's School", label: "St. Mary's School" }
  ];


  const allSocialDone = Object.values(formData.socialChecks).every(Boolean);

  const toggleSocial = (key) => {
    setFormData({
      ...formData,
      socialChecks: {
        ...formData.socialChecks,
        [key]: !formData.socialChecks[key]
      }
    });
  };

  const steps = [
    "User verification",
    "Create Username",
    "Contact",
    "School",
    "Parents",
    "Siblings",
    "Social"
  ];
  const getMobileSteps = () => {
    const total = steps.length;
    const current = step;

    let result = [];

    // Always show first step if current > 1
    if (current > 1) {
      result.push(0);
    }

    // Previous
    if (current - 1 >= 0) {
      result.push(current - 1);
    }

    // Current
    result.push(current);

    // Next
    if (current + 1 < total) {
      result.push(current + 1);
    }

    // If not near last step, show dots + last
    if (current + 1 < total - 1) {
      result.push("dots");
      result.push(total - 1);
    }

    return [...new Set(result)];
  };

const professionOptions = [
  "Business",
  "Farmer",
  "Doctor",
  "Engineer",
  "Teacher",
  "Lawyer",
  "Defense Services",
  "Police",
  "Driver",
  "Daily Wage Worker",
  "Housewife",
  "Retired",
  "Unemployed",
  "Self Employed",
  "Government Employee",
  "Private Employee",
  "Other"
];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Detailed Registration Page
          </h1>
          <p className="text-blue-100 mt-2">
            Complete your profile in {steps.length} simple steps
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="px-4 md:px-8 pt-6">

          {/* Desktop Full Stepper */}
          <div className="hidden md:block relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            <div
              className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            ></div>

            <div className="relative flex justify-between">
              {steps.map((title, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={index > step}
                  onClick={() => handleStepClick(index)}
                  className={`flex flex-col items-center ${index <= step ? "text-blue-600" : "text-gray-400"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2">{title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Smart Stepper */}
          <div className="md:hidden flex items-center justify-center gap-3">

            {getMobileSteps().map((item, i) => {
              if (item === "dots") {
                return (
                  <span key={i} className="text-gray-400 font-bold">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStepClick(item)}
                  disabled={item > step}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${item === step
                    ? "bg-blue-600 text-white"
                    : item < step
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {item + 1}
                </button>
              );
            })}

          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: User Information */}
            {step === 0 && (
              <div className="space-y-2">
                {/* Info Alert */}
                <div className="bg-amber-50 border-l-4 border-amber-500 mx-2 mt-6 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> Please ensure that you are writing the same name and WhatsApp Number that you have provided in the "Payment Registration Page" earlier.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

                  {/* NAME */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter name"
                    />
                  </div>

                  {/* WHATSAPP */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Whatsapp Number <span className="text-red-500">*</span>
                    </label>

                    <PhoneInput
                      country={"in"}
                      enableSearch
                      value={formData.whatsapp || ""}
                      onChange={(phone, data) =>
                        setFormData({
                          ...formData,
                          whatsapp: phone,
                          country: data.countryCode,
                          countryCode: "+" + data.dialCode
                        })
                      }
                      containerClass="w-full"
                      inputClass="!w-full !h-[44px] !pl-14 !pr-4 !rounded-lg !border !border-gray-300 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-500"
                      buttonClass="!border-gray-300 !rounded-l-lg"
                    />
                  </div>

                </div>


              </div>
            )}
            {step === 1 && (
              <div className="space-y-6">
                {/* <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">User Information</h2> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Choose Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      {/* Left @ symbol */}
                      <span className="absolute left-3 top-2.5 text-gray-500">@</span>

                      {/* Input */}
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9_]/g, "")
                          })
                        }
                        className="pl-8 pr-20 w-full border rounded-lg px-4 py-2"
                        placeholder="afzalreyaz"
                        required
                      />

                      {/* Right side status */}
                      {usernameChecking && (
                        <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                          Checking...
                        </span>
                      )}

                      {!usernameChecking && usernameAvailable === true && (
                        <span className="absolute right-3 top-2.5 text-green-600 text-sm">
                          ✓
                        </span>
                      )}

                      {!usernameChecking && usernameAvailable === false && (
                        <span className="absolute right-3 top-2.5 text-red-600 text-sm">
                          ✕
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 mx-2 mt-6 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> You can avail all the services of The True Topper through this unique username.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Step 2: Contact Details */}
            {step === 2 && (
              <div className="space-y-6">

                {/* EMAIL + DOB + GENDER + DISABILITY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="useremail@gmail.com"
                    />
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob || ""}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* GENDER */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* DISABILITY */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Disability
                    </label>
                    <select
                      name="disability"
                      value={formData.disability}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                </div>

                {/* FROM WHERE */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Are you from? <span className="text-red-500">*</span>
                  </h2>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="origin"
                        checked={isIndian}
                        onChange={() => {
                          setIsIndian(true);
                        }}
                      />
                      India
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="origin"
                        checked={!isIndian}
                        onChange={() => {
                          setIsIndian(false);
                          setFormData(prev => ({
                            ...prev,
                            country: "",
                            countryCode: "",
                            state: "",
                            district: ""
                          }));
                        }}
                      />
                      Others Country
                    </label>
                  </div>
                </div>

                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* SHOW COUNTRY ONLY IF OTHERS */}
                  {!isIndian && (
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country <span className="text-red-500">*</span>
                        </label>

                        <Select
                          options={countries}
                          placeholder="Select Country"
                          value={countries.find(c => c.value === formData.country || "")}
                          onChange={(selected) =>
                            setFormData(prev => ({
                              ...prev,
                              country: selected.value,
                              countryCode: "+" + selected.phone,
                              state: ""
                            }))
                          }
                        />
                      </div>


                      {/* PHONE */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>

                        <PhoneInput
                          country="us"
                          enableSearch
                          value={formData.mobile || ""}
                          onChange={(phone, data) =>
                            setFormData(prev => ({
                              ...prev,
                              mobile: phone,
                              countryCode: "+" + data.dialCode
                            }))
                          }
                          containerClass="w-full"
                          inputClass="!w-full !h-[44px] !pl-14 !rounded-lg !border !border-gray-300"
                        />
                      </div>
                    </div>
                  )}



                  {/* DISTRICT — ONLY FOR INDIA */}
                  {isIndian && (
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* STATE */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>

                        <Select
                          options={states}
                          placeholder="Select State"
                          value={states.find(s => s.value === formData.state || "")}
                          onChange={(selected) =>
                            setFormData(prev => ({ ...prev, state: selected.value }))
                          }
                        />
                      </div>

                      {/* DISTRICT */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          District <span className="text-red-500">*</span>
                        </label>

                        <input
                          type="text"
                          name="district"
                          value={formData.district || ""}
                          onChange={handleChange}
                          className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter district"
                        />
                      </div>
                      {/* DISTRICT */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Pin code <span className="text-red-500"></span>
                        </label>

                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode || ""}
                          onChange={handleChange}
                          className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Pincode"
                        />
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>

                        <PhoneInput
                          country="in"
                          enableSearch
                          value={formData.mobile || ""}
                          onChange={(phone, data) =>
                            setFormData(prev => ({
                              ...prev,
                              mobile: phone,
                              countryCode: "+" + data.dialCode
                            }))
                          }
                          containerClass="w-full"
                          inputClass="!w-full !h-[44px] !pl-14 !rounded-lg !border !border-gray-300"
                        />
                      </div>

                    </div>
                  )}




                  {/* ADDRESS */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500"></span>
                    </label>

                    <textarea
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* Step 3: School Details */}
            {step === 3 && (
              <div className="space-y-6">

                {/* SCHOOL LOCATION QUESTION */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Your school is in? <span className="text-red-500">*</span>
                  </h2>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={isSchoolIndian}
                        onChange={() => {
                          setIsSchoolIndian(true);
                          setFormData(prev => ({
                            ...prev,
                            schoolCountry: "IN",
                            schoolState: "",
                            schoolDistrict: "",
                            schoolPincode: ""
                          }));
                        }}
                      />
                      India
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!isSchoolIndian}
                        onChange={() => {
                          setIsSchoolIndian(false);
                          setFormData(prev => ({
                            ...prev,
                            schoolCountry: "",
                            schoolState: "",
                            schoolDistrict: "",
                            schoolPincode: ""
                          }));
                        }}
                      />
                      Others Country
                    </label>
                  </div>
                </div>

                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* SHOW COUNTRY ONLY IF OTHERS */}
                  {!isSchoolIndian && (

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* SCHOOL NAME */}
                      <div className="">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          School Name <span className="text-red-500">*</span>
                        </label>

                        <select
                            name="school"
                            value={formData.school || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                school: e.target.value
                              })
                            }
                            className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select School</option>

                            {schools?.map((school) => (
                              <option key={school._id} value={school._id}>
                                {school.name}
                              </option>
                            ))}

                          </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Country <span className="text-red-500">*</span>
                        </label>

                        <Select
                          options={countries}
                          placeholder="Select Country"
                          value={countries.find(c => c.value === formData.schoolCountry || "")}
                          onChange={(selected) =>
                            setFormData(prev => ({
                              ...prev,
                              schoolCountry: selected.value,
                              schoolState: ""
                            }))
                          }
                        />
                      </div>

                    </div>
                  )}

                  {/* INDIA FIELDS */}
                  {isSchoolIndian && (
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* SCHOOL NAME */}
                      <div className="">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          School Name <span className="text-red-500">*</span>
                        </label>

                        <select
                            name="school"
                            value={formData.school || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                school: e.target.value
                              })
                            }
                            className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select School</option>

                            {schools?.map((school) => (
                              <option key={school._id} value={school._id}>
                                {school.name}
                              </option>
                            ))}

                          </select>
                      </div>
                      {/* STATE */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>

                        <Select
                          options={schoolStates}
                          placeholder="Select State"
                          value={schoolStates.find(s => s.value === formData.schoolState || "")}
                          onChange={(selected) =>
                            setFormData(prev => ({
                              ...prev,
                              schoolState: selected.value
                            }))
                          }
                        />
                      </div>

                      {/* DISTRICT */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          District <span className="text-red-500"></span>
                        </label>

                        <input
                          type="text"
                          value={formData.schoolDistrict || ""}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              schoolDistrict: e.target.value
                            }))
                          }
                          className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter district"
                        />
                      </div>

                      {/* PINCODE */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>

                        <input
                          type="text"
                          value={formData.schoolPincode || ""}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              schoolPincode: e.target.value
                            }))
                          }
                          className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter pincode"
                        />
                      </div>


                    </div>
                  )}



                </div>
              </div>
            )}




            {/* Step 4: Parents Details */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Parents Details</h2>

                {/* Father's Information */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-blue-800 mb-4">Father's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter father's name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father's Phone <span className="text-red-500">*</span>
                      </label>
                      <PhoneInput
                        country={"in"}
                        enableSearch
                        value={formData.fatherMobile || ""}
                        onChange={(phone) =>
                          setFormData({
                            ...formData,
                            fatherMobile: phone
                          })
                        }
                        inputClass="!w-full !px-4 !py-3 !pl-14 !rounded-lg !border-gray-300"
                        containerClass="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father's Email
                      </label>
                      <input
                        type="email"
                        name="fatherEmail"
                        value={formData.fatherEmail || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="father@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father's Profession
                      </label>
                      <select
                          name="fatherProfession"
                          value={formData.fatherProfession}
                          onChange={handleChange}
                          className="w-full text-sm px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Profession</option>
                          {professionOptions.map((profession, index) => (
                            <option key={index} value={profession}>
                              {profession}
                            </option>
                          ))}
                        </select>
                    </div>
                  </div>
                </div>

                {/* Mother's Information */}
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-pink-800 mb-4">Mother's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter mother's name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother's Phone <span className="text-red-500">*</span>
                      </label>
                      <PhoneInput
                        country={"in"}
                        enableSearch
                        value={formData.motherMobile || ""}
                        onChange={(phone) =>
                          setFormData({
                            ...formData,
                            motherMobile: phone
                          })
                        }
                        inputClass="!w-full !px-4 !py-3 !pl-14 !rounded-lg !border-gray-300"
                        containerClass="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother's Email
                      </label>
                      <input
                        type="email"
                        name="motherEmail"
                        value={formData.motherEmail || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="mother@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother's Profession
                      </label>
                      <select
                            name="motherProfession"
                            value={formData.motherProfession}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select Profession</option>
                            {professionOptions.map((profession, index) => (
                              <option key={index} value={profession}>
                                {profession}
                              </option>
                            ))}
                          </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Siblings Details */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Siblings Details</h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Siblings <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      onChange={(e) => handleSiblingCount(Number(e.target.value))}
                      value={formData.siblingCount || ""}
                    >
                      <option value="0">Select number of siblings</option>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  {formData.siblings.map((sib, i) => (
                    <div key={i} className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <h4 className="text-lg font-medium text-gray-700 mb-4">Sibling {i + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={sib.name || ""}
                            onChange={(e) => handleSiblingChange(i, "name", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={sib.dob || ""}
                            onChange={(e) => handleSiblingChange(i, "dob", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Class/Grade
                          </label>
                          <input
                            type="text"
                            value={sib.class || ""}
                            onChange={(e) => handleSiblingChange(i, "class", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="e.g., 10th Grade"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School
                          </label>
                          <input
                            type="text"
                            value={sib.school || ""}
                            onChange={(e) => handleSiblingChange(i, "school", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter school name"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Social Media */}
            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Follow The True Topper (Mandatory)</h2>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-6">
                    Please visit all our official social media pages and mark them as visited to complete your registration.
                  </p>

                  <div className="space-y-4">
                    {[
                      { key: "youtube", label: "YouTube Channel", link: "https://www.youtube.com/channel/UCuhOvW3kyngZhp8J3q54QHA", color: "bg-red-50", border: "border-red-200" },
                      { key: "instagram", label: "Instagram Page", link: "https://www.instagram.com/thetruetopper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", color: "bg-pink-50", border: "border-pink-200" },
                      { key: "facebook", label: "Facebook Page", link: "https://www.facebook.com/TheTrueTopper", color: "bg-blue-50", border: "border-blue-200" },
                      { key: "telegram", label: "X ( Twitter )", link: "https://x.com/TheTrueTopper", color: "bg-sky-50", border: "border-sky-200" },
                      { key: "whatsapp", label: "WhatsApp", link: "https://api.whatsapp.com/send?phone=9622222800", color: "bg-green-50", border: "border-green-200" }
                    ].map((social) => (
                      <div key={social.key} className={`flex items-center justify-between p-4 border rounded-lg ${social.border} ${social.color}`}>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              window.open(social.link, "_blank");
                              toggleSocial(social.key);
                            }}
                            className="text-gray-800 font-medium hover:text-blue-600 transition"
                          >
                            {social.label}
                          </button>
                        </div>

                        <div className="flex items-center space-x-2">
                          {formData.socialChecks[social.key] ? (
                            <>
                              <span className="text-green-600 font-medium">✓ Visited</span>
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-500">Not visited</span>
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${allSocialDone ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                    <div className="flex items-center">
                      {allSocialDone ? (
                        <>
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-green-700 font-medium">All social pages visited! You can proceed with final submission.</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-amber-700">Please visit all social media pages to complete registration.</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              {/* BACK BUTTON */}
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className={`px-6 py-3 rounded-lg font-medium transition ${step === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                ← Back
              </button>

              {/* IF NOT LAST STEP → SHOW CONTINUE */}
              {step !== steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
                >
                  Continue →
                </button>
              ) : (
                /* ONLY LAST STEP → COMPLETE REGISTRATION */
                <button
                  type="submit"
                  disabled={!allSocialDone}
                  className={`px-8 py-3 rounded-lg font-medium transition ${allSocialDone
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 md:px-8 py-4 border-t text-center text-sm text-gray-500">
          <p>© 2026 The True Topper. All rights reserved.</p>
        </div>
        <GlobalModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            navigate("/results");
          }}
          title="Congratulations 🎉"
          message="You have successfully registered for the International Ethical Entrepreneurship Olympiad ++."
          type="success"
        />

      </div>
    </div>
  );
}

export default Register;