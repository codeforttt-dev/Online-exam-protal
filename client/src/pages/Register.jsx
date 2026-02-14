import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/thunks/userThunk";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { useMemo } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CreatableSelect from "react-select/creatable";

function Register() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [isIndian, setIsIndian] = useState(true);
  const [isSchoolIndian, setIsSchoolIndian] = useState(true);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    dob: "",

    country: "IN",
    countryCode: "+91",

    state: "",
    mobile: "",

    email: "",
    district: "",
    address: "",

    school: "",
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

  const countries = useMemo(() => {
    return Country.getAllCountries().map(c => ({
      value: c.isoCode,
      label: c.name,
      phone: c.phonecode
    }));
  }, []);

  const states = useMemo(() => {
    if (!formData.country) return [];

    return State.getStatesOfCountry(formData.country).map(s => ({
      value: s.isoCode,
      label: s.name
    }));
  }, [formData.country]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Registration Completed 🎉");
    navigate("/results");

    // const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();

    // if (age < 3 || age > 25) {
    //   alert("Please enter valid student age (3-25 years)");
    //   return;
    // }

    // const payload = {
    //   username: formData.username,
    //   password: formData.password,
    //   email: formData.email,
    //   mobile: `${formData.countryCode}${formData.mobile}`,
    //   fatherMobile: `${formData.countryCode}${formData.fatherMobile}`,
    //   motherMobile: `${formData.countryCode}${formData.motherMobile}`,
    //   country: formData.country,
    //   state: formData.state,
    //   dob: formData.dob,
    //   district: formData.district,
    //   address: formData.address,
    //   school: formData.school,
    //   fatherName: formData.fatherName,
    //   fatherEmail: formData.fatherEmail,
    //   fatherProfession: formData.fatherProfession,
    //   motherName: formData.motherName,
    //   motherEmail: formData.motherEmail,
    //   motherProfession: formData.motherProfession,
    //   siblings: formData.siblings
    // };

    // try {
    //   await dispatch(signupUser(payload)).unwrap();
    //   alert("Registration Completed 🎉");
    //   setFormData({
    //     username: "",
    //     password: "",
    //     confirmPassword: "",
    //     dob: "",
    //     mobile: "",
    //     email: "",
    //     state: "",
    //     district: "",
    //     address: "",
    //     school: "",
    //     fatherName: "",
    //     fatherMobile: "",
    //     fatherEmail: "",
    //     fatherProfession: "",
    //     motherName: "",
    //     motherMobile: "",
    //     motherEmail: "",
    //     motherProfession: "",
    //     siblings: [],
    //     siblingCount: 0,
    //     socialChecks: {
    //       youtube: false,
    //       instagram: false,
    //       facebook: false,
    //       telegram: false,
    //       whatsapp: false
    //     },
    //     acceptTerms: false
    //   });
    //   navigate("/dashboard");
    // } catch (err) {
    //   alert(err || "Registration failed");
    // }
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
    "User Info",
    "Contact",
    "School",
    "Parents",
    "Siblings",
    "Social"
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

        {/* Info Alert */}
        {/* <div className="bg-amber-50 border-l-4 border-amber-500 mx-6 mt-6 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> All fields are mandatory. Please save this URL if you wish to complete registration later. You can return anytime using the saved URL.
              </p>
            </div>
          </div>
        </div> */}

        {/* Progress Stepper */}
        <div className="px-6 md:px-8 pt-8">
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            <div className="absolute top-5 left-0 h-0.5 bg-blue-600" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div>
            <div className="relative flex justify-between">
              {steps.map((stepTitle, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`flex flex-col items-center ${index <= step ? "text-blue-600" : "text-gray-400"}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${index <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs font-medium mt-2 ${index === step ? "font-bold" : ""}`}>
                    {stepTitle}
                  </span>
                </button>
              ))}
            </div>
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
                      value={formData.name}
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
                      value={formData.whatsapp}
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
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">User Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
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
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
{/* Step 2: Contact Details */}
{step === 2 && (
  <div className="space-y-6">

    {/* ================= FROM WHERE ================= */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Are you from? <span className="text-red-500">*</span>
      </h2>

      <div className="flex gap-6">

        {/* INDIA */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="origin"
            checked={isIndian}
            onChange={() => {
              setIsIndian(true);

              // auto set India
              setFormData({
                ...formData,
                country: "IN",
                countryCode: "+91",
                state: ""
              });
            }}
          />
          India
        </label>

        {/* OTHERS */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="origin"
            checked={!isIndian}
            onChange={() => {
              setIsIndian(false);

              // clear selection
              setFormData({
                ...formData,
                country: "",
                countryCode: "",
                state: ""
              });
            }}
          />
          Others
        </label>

      </div>
    </div>


    {/* ================= FORM GRID ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


      {/* COUNTRY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>

        <Select
          options={countries}
          placeholder="Select Country"

          value={
            countries.find(c =>
              isIndian ? c.value === "IN" : c.value === formData.country
            )
          }

          isDisabled={isIndian}  

          onChange={(selected) =>
            setFormData({
              ...formData,
              country: selected.value,
              countryCode: "+" + selected.phone,
              state: ""
            })
          }
        />
      </div>


      {/* STATE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State <span className="text-red-500">*</span>
        </label>

        <Select
          options={states}
          placeholder="Select State"
          value={states.find(s => s.value === formData.state)}
          onChange={(selected) =>
            setFormData({ ...formData, state: selected.value })
          }
        />
      </div>


      {/* PHONE */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>

        <PhoneInput
          country={isIndian ? "in" : undefined}
          enableSearch
          value={formData.mobile}
          onChange={(phone, data) =>
            setFormData({
              ...formData,
              mobile: phone,
              countryCode: "+" + data.dialCode
            })
          }
          containerClass="w-full"
          inputClass="!w-full !h-[44px] !pl-14 !rounded-lg !border !border-gray-300"
        />
      </div>


      {/* ADDRESS */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
        />
      </div>

    </div>
  </div>
)}


{step === 3 && (
  <div className="space-y-6">

    {/* ================= SCHOOL LOCATION QUESTION ================= */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your school is in? <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-6">

        {/* INDIA */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={isSchoolIndian}
            onChange={() => {
              setIsSchoolIndian(true);

              setFormData(prev => ({
                ...prev,
                country: "IN",
                countryCode: "+91",
                state: ""
              }));
            }}
          />
          India
        </label>

        {/* OTHERS */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!isSchoolIndian}
            onChange={() => {
              setIsSchoolIndian(false);

              setFormData(prev => ({
                ...prev,
                country: "",
                countryCode: "",
                state: ""
              }));
            }}
          />
          Others
        </label>

      </div>
    </div>


    {/* ================= FORM GRID ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* COUNTRY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>

        <Select
          options={countries}
          placeholder="Select Country"

          value={
            countries.find(c =>
              isSchoolIndian ? c.value === "IN" : c.value === formData.country
            )
          }

          isDisabled={isSchoolIndian}

          onChange={(selected) =>
            setFormData(prev => ({
              ...prev,
              country: selected.value,
              countryCode: "+" + selected.phone,
              state: ""
            }))
          }

          styles={{
            control: (base) => ({
              ...base,
              minHeight: "44px",
              borderRadius: "0.5rem"
            })
          }}
        />
      </div>


      {/* STATE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State <span className="text-red-500">*</span>
        </label>

        <Select
          options={states}
          placeholder="Select State"
          value={states.find(s => s.value === formData.state)}
          onChange={(selected) =>
            setFormData(prev => ({ ...prev, state: selected.value }))
          }
          isDisabled={!formData.country}

          styles={{
            control: (base) => ({
              ...base,
              minHeight: "44px",
              borderRadius: "0.5rem"
            })
          }}
        />
      </div>


{/* SCHOOL */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    School Name <span className="text-red-500">*</span>
  </label>
          <p className="text-xs text-gray-500">
  Can't find your school? Type and press Enter
</p>

  <CreatableSelect
    options={schoolOptions}
    isSearchable
    placeholder="Search or type your school name"

    value={
      formData.school
        ? { label: formData.school, value: formData.school }
        : null
    }

    onChange={(selected) =>
      setFormData(prev => ({
        ...prev,
        school: selected.value
      }))
    }

    onCreateOption={(inputValue) =>
      setFormData(prev => ({
        ...prev,
        school: inputValue
      }))
    }

    styles={{
      control: (base) => ({
        ...base,
        minHeight: "44px",
        borderRadius: "0.5rem"
      })
    }}
  />
</div>



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
                        value={formData.fatherName}
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
                        value={formData.fatherMobile}
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
                        value={formData.fatherEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="father@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father's Profession
                      </label>
                      <input
                        type="text"
                        name="fatherProfession"
                        value={formData.fatherProfession}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter profession"
                      />
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
                        value={formData.motherName}
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
                        value={formData.motherMobile}
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
                        value={formData.motherEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="mother@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother's Profession
                      </label>
                      <input
                        type="text"
                        name="motherProfession"
                        value={formData.motherProfession}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter profession"
                      />
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
                      value={formData.siblingCount}
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
                            value={sib.name}
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
                            value={sib.dob}
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
                            value={sib.class}
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
                            value={sib.school}
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
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className={`px-6 py-3 rounded-lg font-medium transition ${step === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                ← Back
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!allSocialDone}
                  className={`px-8 py-3 rounded-lg font-medium transition ${allSocialDone ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 md:px-8 py-4 border-t text-center text-sm text-gray-500">
          <p>© 2024 The True Topper. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;