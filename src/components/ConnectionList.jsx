import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getConnections = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(response.data);
    } catch (error) {
      // console.error("Error fetching connections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="w-full overflow-auto p-4 max-md:pt-24 h-full max-md:h-screen bg-gray-800 text-white shadow-xl lg:rounded-l-xl">
      <h2 className="text-xl font-bold mb-5 py-2 border-b border-gray-600">Connections</h2>

      {isLoading ? (
        <p className="">Loading...</p>
      ) : connections.length === 0 ? (
        <p className="">No connections found</p>
      ) : (
        <div className="space-y-2">
          {connections.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
              onClick={() => navigate(`/chat/${user._id}`)}
            >
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-md font-semibold">
                  {user.firstName} {user.lastName && user.lastName}
                </h3>
                <p className="text-xs text-gray-500">
                  {user.status || "Hey there! I'm using DevConnect."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionList;
