import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "../constants";
import { IoRemoveSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { validateForm } from "../utils/validationFncs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fetchLocationSuggestions } from "../utils/suggestionFncs";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    dob: "",
    bio: "",
    password: "",
    gender: "",
    profilePic: null,
  });
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchLocations = async () => {
      if (locationQuery.trim().length > 2) {
        setIsLoadingLocations(true);
        const suggestions = await fetchLocationSuggestions(locationQuery);
        setLocationSuggestions(suggestions);
        setIsLoadingLocations(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocations, 300);
    return () => clearTimeout(debounceTimer);
  }, [locationQuery]);

  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
    handleInputChange(e);
  };
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skill) => {
    if (skills.includes(skill.trim())) {
      toast.error("Skill already added.");
      return;
    }
    if (skill.trim() !== "") {
      setSkills([...skills, skill.trim()]);
      setSkillInput("");
      setSkillSuggestions([]);
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillSuggestion = async (query) => {
    if (!query) {
      setSkillSuggestions([]);
      return;
    }
    const filteredSkills = await axios.get(BASE_URL + "/skills/suggestion", {
      params: { q: query },
    });
    setSkillSuggestions(filteredSkills.data.slice(0, 5));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData, skills, "signup");

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("Please fix the errors before proceeding.");
      return;
    }
    const finalFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "profilePic" && value) {
        finalFormData.append(key, value);
      } else {
        finalFormData.append(key, value);
      }
    });
    finalFormData.append("skills", JSON.stringify(skills));
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/signup", finalFormData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Signed up successfully!");
        navigate("/", { replace: true });
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (err) {
      toast.error(err.response?.data || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 py-10 px-4 pt-32">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 uppercase text-white bg-gray-800">
          Sign up
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-4 ">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="rounded-md px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="rounded-md px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-md px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Password *
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="rounded-md w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
                />
                <span
                  className="absolute text-lg right-4 top-3 text-white cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="rounded-md px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob}</p>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="rounded-md px-4 p-2.5 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col relative">
            <label className="mb-2 font-semibold text-gray-300">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleLocationChange}
              className="rounded-md px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              autoComplete="off"
            />

            {(locationSuggestions.length > 0 || isLoadingLocations) && (
              <div className="absolute top-full mt-1 w-full rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {isLoadingLocations ? (
                  <div className="p-2 text-gray-300 bg-gray-800 rounded-lg">
                    Loading...
                  </div>
                ) : (
                  locationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm text-gray-300"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          location: suggestion,
                        }));
                        setLocationSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))
                )}
              </div>
            )}

            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Bio *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="rounded-md px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none"
              style={{ resize: "none" }}
              placeholder="Enter 20-200 characters"
            />
            <p className="mt-1 text-sm text-gray-400">
              {formData.bio.length}/200 characters
            </p>

            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-300">Skills *</label>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => {
                setSkillInput(e.target.value);
                handleSkillSuggestion(e.target.value);
              }}
              className="rounded-md px-4 py-2 w-full bg-gray-700 border border-gray-600 text-white focus:outline-none"
              placeholder="Enter 3-6 skills"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills}</p>
            )}
            <div className="relative">
              {skillSuggestions.length > 0 && (
                <ul className="absolute w-full mt-1 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {skillSuggestions.map((skill, index) => (
                    <li
                      key={skill + index}
                      onClick={() => handleAddSkill(skill)}
                      className={`flex hover:bg-gray-600 w-full cursor-pointer px-4 py-2 text-white bg-gray-700 text-sm justify-between items-center ${
                        skill === "No match found" && "pointer-events-none"
                      }`}
                    >
                      <span>{skill}</span>
                      {!skill === "No match found" && (
                        <span>
                          <IoMdAdd />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-2">
              {skills.length > 0 && (
                <ul className="flex flex-wrap items-center gap-2">
                  {skills.map((skill, index) => (
                    <li
                      key={skill}
                      className="flex gap-x-2 px-4 py-1.5 rounded-lg bg-gray-700 text-gray-300 text-sm justify-center items-center"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        type="button"
                        className="text-red-500 text-lg"
                      >
                        <IoRemoveSharp />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">
              Profile Picture *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profilePic: e.target.files[0] || null,
                }))
              }
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white file:cursor-pointer"
            />
          </div>
          {errors.profilePic && (
            <p className="text-red-500 text-sm">{errors.profilePic}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-950 px-4 py-2 rounded-md text-white"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-gray-300 underline hover:underline transition duration-300"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
