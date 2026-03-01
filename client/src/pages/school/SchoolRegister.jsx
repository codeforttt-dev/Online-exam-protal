import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerSchool, checkSchoolUsername } from "../../redux/thunks/school/schoolThunk";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";

function SchoolRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, usernameAvailable, usernameChecking } = useSelector((state) => state.school);

  const [step, setStep] = useState(0);
  const [isIndian, setIsIndian] = useState(true);

  const steps = ["Basic Info", "Location"];

  const [formData, setFormData] = useState({
    schoolName: "",

    // Address
    country: "IN",
    state: "",
    district: "",
    pincode: "",

    // Contact Details (School)
    stdCode: "",
    landlineNumber: "",
    mobile: "",
    whatsapp: "",

    // Principal Details
    principalName: "",
    principalMobile: "",
    principalWhatsapp: "",
    principalEmail: "",

    // Contact Person / Mentor
    contactPersonName: "",
    contactPersonDesignation: "",
    contactPersonMobile: "",
    contactPersonWhatsapp: "",
    contactPersonEmail: "",

    // Category
    category1: "",
    category2: "",
    board: "",
    medium: "",

    // Auth
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= USERNAME CHECK ================= */
  useEffect(() => {
    if (!formData.username || formData.username.length < 3) return;

    const timer = setTimeout(() => {
      dispatch(checkSchoolUsername(formData.username));
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Prevent submit if not last step
    if (step !== steps.length - 1) return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (usernameAvailable !== true) {
      alert("Please verify username availability");
      return;
    }

    try {
      const result = await dispatch(registerSchool(formData));

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/school/leaderboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= COUNTRY / STATE ================= */

  const countries = useMemo(() => {
    return Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name
    }));
  }, []);

  const states = useMemo(() => {
    if (!formData.country) return [];

    return State.getStatesOfCountry(formData.country).map((s) => ({
      value: s.isoCode,
      label: s.name
    }));
  }, [formData.country]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 md:p-8 rounded-t-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            School Registration Page
          </h1>
          <p className="text-blue-100 mt-2">
            Complete your profile in {steps.length} simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && step !== steps.length - 1) {
              e.preventDefault();
            }
          }} className="space-y-8">

          {/* ================= STEP 0 ================= */}
          {step === 0 && (
            <div className="grid md:grid-cols-2 gap-4">

              <Input
                label="School Name"
                required
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                helperText="Enter as per the official records"
              />

              {/* USERNAME */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Username <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 text-sm">
                    @i-
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "")
                      })
                    }
                    className={`w-full h-[44px] pl-10 pr-4 rounded-lg border
                      ${usernameAvailable === false
                        ? "border-red-500 focus:ring-red-400"
                        : usernameAvailable === true
                          ? "border-green-500 focus:ring-green-400"
                          : "border-gray-300 focus:ring-blue-500"
                      }
                      focus:ring-2 outline-none transition text-sm`}
                    placeholder="schoolname"
                    required
                  />
                </div>

                {usernameChecking && (
                  <p className="text-xs text-gray-400">Checking availability...</p>
                )}
                {!usernameChecking && usernameAvailable === true && (
                  <p className="text-xs text-green-600">
                    ✔ Username available
                  </p>
                )}
                {!usernameChecking && usernameAvailable === false && (
                  <p className="text-xs text-red-600">
                    ✖ Username already taken
                  </p>
                )}
              </div>

              <Input
                label="Password"
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                helperText="Minimum 6 characters"
              />

              <Input
                label="Confirm Password"
                required
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {/* SCHOOL CONTACT DETAILS */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Contact Details of School</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="STD Code" name="stdCode" value={formData.stdCode} onChange={handleChange} />
                  <Input label="Landline Number" name="landlineNumber" value={formData.landlineNumber} onChange={handleChange} />
                  <Input label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
                  <Input label="WhatsApp Number" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="space-y-2">

              {/* COUNTRY RADIO */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  School Location
                </h3>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={isIndian}
                      onChange={() => {
                        setIsIndian(true);
                        setFormData(prev => ({
                          ...prev,
                          country: "IN",
                          state: ""
                        }));
                      }}
                    />
                    India
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isIndian}
                      onChange={() => {
                        setIsIndian(false);
                        setFormData(prev => ({
                          ...prev,
                          country: "",
                          state: ""
                        }));
                      }}
                    />
                    Other Country
                  </label>
                </div>
              </div>

              {/* LOCATION FIELDS */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* IF OTHER COUNTRY → SHOW COUNTRY SELECT */}
                {!isIndian && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>

                    <Select
                      options={countries}
                      placeholder="Select Country"
                      value={countries.find(c => c.value === formData.country) || null}
                      onChange={(selected) =>
                        setFormData(prev => ({
                          ...prev,
                          country: selected.value,
                          state: ""
                        }))
                      }
                    />
                  </div>

                )}
              </div>
              {isIndian && (
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* STATE */}
                    <div className="grid md:grid-cols-1 gap-2 ">
                      <label className="text-sm font-medium text-gray-700 ">
                        State <span className="text-red-500">*</span>
                      </label>

                      <Select
                        options={states}
                        placeholder="Select State"
                        value={states.find(s => s.value === formData.state) || null}
                        onChange={(selected) =>
                          setFormData(prev => ({
                            ...prev,
                            state: selected.value
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6 ">

                    <div className="grid md:grid-cols-2 gap-6 ">
                      {/* DISTRICT */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          District
                        </label>

                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
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
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full h-[44px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORY */}
              <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">School Classification</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <SimpleSelect
                    name="category1"
                    options={[
                      "Central Government",
                      "State Government",
                      "Government Aided",
                      "Private",
                      "Other"
                    ]}
                    onChange={(e) =>
                      setFormData({ ...formData, category1: e.target.value })
                    }
                  />

                  <SimpleSelect
                    name="category2"
                    options={["Rural", "Urban"]}
                    onChange={(e) =>
                      setFormData({ ...formData, category2: e.target.value })
                    }
                  />

                  <SimpleSelect
                    name="board"
                    options={[
                      "CBSE",
                      "ICSE",
                      "IB",
                      "State Board",
                      "Sanskrit",
                      "Madarsa",
                      "Others"
                    ]}
                    onChange={(e) =>
                      setFormData({ ...formData, board: e.target.value })
                    }
                  />

                  <Input
                    label="Medium of Instruction"
                    name="medium"
                    value={formData.medium}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* CONTACT PERSON DETAILS */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Contact Person / Appointed Mentor</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Name" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
                  <Input label="Designation" name="contactPersonDesignation" value={formData.contactPersonDesignation} onChange={handleChange} />
                  <Input label="Mobile Number" name="contactPersonMobile" value={formData.contactPersonMobile} onChange={handleChange} />
                  <Input label="WhatsApp Number" name="contactPersonWhatsapp" value={formData.contactPersonWhatsapp} onChange={handleChange} />
                  <Input label="Email ID" type="email" name="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} />
                </div>
              </div>


            </div>
          )}



          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-200 rounded-lg"
            >
              Back
            </button>

            {step !== steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                {loading ? "Submitting..." : "Register School"}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

const Input = ({ label, required, helperText, type = "text", ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      {...props}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
    {helperText && (
      <p className="text-xs text-gray-500">{helperText}</p>
    )}
  </div>
);

const SimpleSelect = ({ name, options, onChange }) => (
  <select
    name={name}
    onChange={onChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
  >
    <option value="">Select {name}</option>
    {options.map((opt, i) => (
      <option key={i} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const SelectBox = ({ label, options, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Select options={options} value={value} onChange={onChange} />
  </div>
);

export default SchoolRegister;