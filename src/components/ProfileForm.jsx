import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants";
import { IoRemoveSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import { validateForm } from "../utils/validationFncs";
import { fetchLocationSuggestions } from "../utils/suggestionFncs";
import { addUser } from "../store/userSlice";

const ProfileForm = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchUserData = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      // console.log(error);
    }
  };

  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    dob: "",
    bio: "",
    profilePic: null,
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        location: userData.location || "",
        bio: userData.bio || "",
        dob: userData.dob || "",
      });
      setSkills(userData.skills || []);
    }
  }, [userData]);

  const handleEditClick = () => setEditForm((prev) => !prev);
  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
    handleInputChange(e);
  };
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
      withCredentials: true,
    });
    setSkillSuggestions(filteredSkills.data.slice(0, 5));
  };

  const handleFormSubmit = async (e) => {
    if (formData.lastName === "") {
      formData.lastName = "";
    }
    e.preventDefault();

    const errors = validateForm(formData, skills, "login");
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const finalFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "email" || key === "dob") {
        return;
      }
      if (key === "profilePic" && value) {
        finalFormData.append(key, value);
      } else {
        finalFormData.append(key, value);
      }
    });
    finalFormData.append("skills", JSON.stringify(skills));

    try {
      if (loading) return;
      setLoading(true);
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        finalFormData,
        {
          withCredentials: true,
        }
      );
      toast.success("Profile updated successfully!");
      await fetchUserData();

      setEditForm(false);
    } catch (err) {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };
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
  return (
    <div>
      <div className="flex items-center justify-between px-1 max-xl:mb-2 gap-x-2">
        <div className="flex flex-col">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-100">
            Your Profile
          </h2>
          <p className="text-xs md:text-sm pb-1 text-gray-400">
            Update your details below to keep your profile up-to-date.
          </p>
        </div>
        <button
          onClick={handleEditClick}
          className="text-white bg-gray-950 hover:bg-gray-900 px-4 max-sm:text-sm py-1 rounded-lg"
        >
          {editForm ? "Cancel" : "Edit"}
        </button>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="mx-auto p-6 bg-gray-900 shadow-md rounded-md space-y-4"
      >
        <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4">
          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-semibold text-gray-300">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!editForm}
              className="rounded-md px-4 py-2 bg-gray-800 text-white focus:outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-semibold text-gray-300">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!editForm}
              className="rounded-md px-4 py-2 bg-gray-800 text-white focus:outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>
        {!editForm && (
          <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4">
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled={true}
                className="rounded-md px-4 py-2 bg-gray-800 text-white focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="mb-2 font-semibold text-gray-300">DOB:</label>
              <input
                type="data"
                name="dob"
                value={new Date(formData.dob).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                disabled={true}
                className="rounded-md px-4 py-2 bg-gray-800 text-white focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col relative">
          <label className="mb-2 font-semibold text-gray-300">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            disabled={!editForm}
            className="rounded-md px-4 py-2 bg-gray-800 text-white focus:outline-none"
          />
          {(locationSuggestions.length > 0 || isLoadingLocations) && (
            <div className="absolute top-full mt-1 w-full rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {isLoadingLocations ? (
                <div className="p-2 text-gray-400">Loading...</div>
              ) : (
                locationSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 cursor-pointer text-sm text-gray-300"
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
          <label className="mb-2 font-semibold text-gray-300">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!editForm}
            className={`rounded-md px-4 py-2 bg-gray-800 ${
              !editForm && "min-h-20"
            } text-white text-sm focus:outline-none`}
            style={{ resize: "none" }}
          />
          {editForm && (
            <p className="mt-1 text-sm text-gray-400">
              {formData.bio.length}/200 characters
            </p>
          )}
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-300">Skills:</label>
          {editForm && (
            <>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => {
                  setSkillInput(e.target.value);
                  handleSkillSuggestion(e.target.value);
                }}
                className="rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none"
                placeholder="Type here..."
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills}</p>
              )}
              <div className="relative">
                {skillSuggestions.length > 0 && (
                  <ul className="absolute w-full">
                    {skillSuggestions.map((skill, index) => (
                      <li
                        key={skill + index}
                        disabled={skill === "No match found"}
                        onClick={() => {
                          handleAddSkill(skill);
                        }}
                        className={`flex hover:bg-gray-700 w-full cursor-pointer px-4 py-2 text-white bg-gray-800 text-sm justify-between items-center ${
                          skill === "No match found" && "pointer-events-none"
                        }`}
                      >
                        <span>{skill}</span>
                        {skill !== "No match found" && (
                          <span>
                            <IoMdAdd />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
          <div className="mt-2">
            {skills.length > 0 && (
              <ul className="flex flex-wrap items-center gap-2">
                {skills.map((skill, index) => (
                  <li
                    key={skill}
                    className="flex gap-x-2 px-4 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm justify-center items-center"
                  >
                    <span className="whitespace-nowrap">{skill}</span>
                    {editForm && (
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        type="button"
                        className="text-red-500 text-lg"
                      >
                        <IoRemoveSharp />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {editForm && (
          <>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-300">
                Upload Image:
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    profilePic: e.target.files[0],
                  }));
                }}
                className="rounded-md px-2 py-2 bg-gray-800 text-gray-300 focus:outline-none"
              />
            </div>
            {errors.profilePic && (
              <p className="text-red-500 text-sm">{errors.profilePic}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-950 hover:bg-gray-800 px-4 py-2 rounded-md text-white"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
