export const validateSkills = (skills) => {
  if (skills.length < 3) {
    return "At least 3 skills are required.";
  }
  if (skills.length > 6) {
    return "You can't add more than 6 skills.";
  }
  return null;
};

export const validateProfilePic = (profilePic) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(profilePic.type)) {
    return "Only JPEG, JPG, and PNG files are allowed.";
  }
  if (profilePic.size > 1 * 1024 * 1024) {
    return "File size must be less than 1MB.";
  }
  return null;
};

export const validateForm = (formData, skills, type) => {
  const newErrors = {};
  if (!formData.firstName || formData.firstName.length < 2)
    newErrors.firstName = "First name must be at least 2 characters.";
  if (!/^[a-zA-Z\s]+$/.test(formData.firstName))
    newErrors.firstName = "First name must contain only alphabets.";
  if (formData.lastName && !/^[a-zA-Z\s]+$/.test(formData.lastName))
    newErrors.lastName = "Last name must contain only alphabets.";
  if (type === "signup" && !formData.email)
    newErrors.email = "Email is required.";
  if (type === "signup" && !formData.password) {
    newErrors.password = "Password is required.";
  } else if (
    type === "signup" &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      formData.password
    )
  ) {
    newErrors.password =
      "Password must be 8+ chars with upper, lower, number & special char (@, $, !, %, *, ?, &).";
  }
  if (type === "signup" && !formData.gender)
    newErrors.gender = "Gender is required.";

  if (type === "signup" && !formData.dob) {
    newErrors.dob = "Date of birth is required.";
  } else {
    const dobDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      newErrors.dob = "You must be at least 18 years old.";
    }
  }
  if (!formData.location) newErrors.location = "Location is required.";
  if (formData.bio.length < 20 || formData.bio.length > 200)
    newErrors.bio = "Bio must be between 20 and 200 characters.";
  const response = validateSkills(skills);
  if (response) {
    newErrors.skills = response;
  }
  if (type === "signup" && !formData.profilePic)
    newErrors.profilePic = "Profile picture is required.";
  if (formData.profilePic) {
    const response = validateProfilePic(formData.profilePic);
    if (response) {
      newErrors.profilePic = response;
    }
  }
  return newErrors;
};

export const validatePassword = (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  );

  if (!passwordRegex.test(password)) {
    return "Password must be 8+ chars with upper, lower, number & special char (@, $, !, %, *, ?, &).";
  }

  return null;
};
