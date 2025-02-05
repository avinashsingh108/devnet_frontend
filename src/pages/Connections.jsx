import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getConnections = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-12 md:px-28 lg:px-60 xl:px-[350px] 2xl:px[450px] pt-28">
      <h1 className="text-2xl sm:text-3xl max-w-3xl border-b border-gray-500 font-semibold py-2 text-white mb-6">
        Your Connections
      </h1>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex flex-col gap-y-2 items-center justify-center col-span-full mt-20">
            <div className="size-16 border-t-4 border-blue-500 border-solid animate-spin rounded-full"></div>
            <span className="text-white">Loading...</span>
          </div>
        ) : connections.length === 0 ? (
          <div className="text-center lg:text-lg max-w-xl mx-auto text-gray-500 mt-20 col-span-full">
            You don&apos;t have any connections yet. Start connecting with
            others to build your network!
          </div>
        ) : (
          connections.map((connection) => (
            <ConnectionCard
              data={connection}
              key={connection._id}
              type="AllConnections"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Connections;
