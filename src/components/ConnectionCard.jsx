import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { calculateAge } from "../utils/calculateAge";

const ConnectionCard = ({ data, requestId, handleRequest, type, date }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border max-w-3xl border-gray-700 rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row max-sm:items-center items-start gap-6">
        <div className="relative flex flex-col items-center">
          <div className="p-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <img
              src={data.profilePic}
              alt={`${data.firstName} ${data.lastName}`}
              className={`size-28 md:size-32 lg:size-40 rounded-full object-cover border-4 border-gray-800`}
            />
          </div>
          {type === "ConnectionRequests" && (
            <p className="text-[10px] text-gray-300 text-center mt-2">
              Received On: {new Date(date).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white capitalize leading-snug">
              {data.firstName} {data.lastName}
            </h2>

            <p className="text-sm text-gray-400 mt-1 capitalize">
              {data.gender}, {calculateAge(data.dob)}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {data.location}
            </p>

            {data.bio && (
              <p className="text-sm text-gray-300 mt-2">{data.bio}</p>
            )}

            {data.skills.length > 0 && (
              <div className="flex flex-wrap lg:justify-start gap-2 mt-4">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-700 text-gray-200 font-medium rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {type === "ConnectionRequests" && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => handleRequest("accepted", requestId)}
                className="w-full sm:w-1/2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2"
              >
                <AiFillLike className="text-lg" />
                Accept
              </button>
              <button
                onClick={() => handleRequest("rejected", requestId)}
                className="w-full sm:w-1/2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
              >
                <AiFillDislike className="text-lg" />
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
