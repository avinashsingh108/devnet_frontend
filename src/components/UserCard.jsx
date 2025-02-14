import { AiOutlineClose } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import { calculateAge } from "../utils/calculateAge";

const UserCard = ({ user, handleRequest, isRequesting, type }) => {
  const { _id, firstName, lastName, bio, skills, profilePic, location, dob } = user;

  return (
    <div className="w-[87%] sm:w-[360px] mx-auto rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-[450px] sm:h-[490px]">
        <img
          src={profilePic}
          alt={`${firstName}'s profile`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-black/70 to-black/90 p-4 sm:p-6 flex flex-col justify-end">
          <div className="mb-1">
            <h2 className="text-2xl font-semibold text-white">
              {firstName} {lastName}{" "}
              {Number.isInteger(calculateAge(dob)) && `, ${calculateAge(dob)}`}
            </h2>
            <div className="flex items-center text-white mt-1">
              <span className="text-xs">{location}</span>
            </div>
          </div>

          <div className="">
            <p className="text-xs text-gray-200 mb-2 line-clamp-2">{bio}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              disabled={type === "profileCard" || isRequesting}
              onClick={() => handleRequest("ignored", _id)}
              className={`w-12 h-12 flex justify-center items-center bg-white rounded-full shadow-lg transition-transform transform disabled:hover:scale-100 hover:scale-110 ${isRequesting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
              title="Ignore"
            >
              {isRequesting ? (
                <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
              ) : (
                <AiOutlineClose className="text-red-500 text-2xl" />
              )}
            </button>
            <button
              disabled={type === "profileCard" || isRequesting}
              onClick={() => handleRequest("interested", _id)}
              className={`w-12 h-12 flex justify-center items-center bg-white rounded-full shadow-lg transition-transform transform disabled:hover:scale-100 hover:scale-110 ${isRequesting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
              title="Interested"
            >
              {isRequesting ? (
                <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
              ) : (
                <IoPersonAdd className="text-green-500 text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
