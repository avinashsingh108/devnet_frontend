import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import ConnectionCard from "../components/ConnectionCard";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestsSlice";
import { toast } from "sonner";

const RequestsReceivedPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      if (status === "accepted" || status === "rejected") {
        dispatch(removeRequest(requestId));
        toast.info(
          `Request ${status === "accepted" ? "accepted" : "rejected"}!`
        );
      }
    } catch (error) {
      // console.error("Error fetching requests:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-12 md:px-28 lg:px-60 xl:px-[350px] 2xl:px[450px] pt-28">
      <h1 className="text-2xl sm:text-3xl max-w-3xl border-b border-gray-500 font-semibold py-2 text-white mb-6">
        Requests Received
      </h1>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex flex-col gap-y-2 items-center justify-center col-span-full mt-20">
            <div className="size-16 border-t-4 border-blue-500 border-solid animate-spin rounded-full"></div>
            <span className="text-white">Loading...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center text-lg text-gray-600 pt-20 col-span-full">
            No requests received yet.
          </div>
        ) : (
          requests.map((request) => (
            <ConnectionCard
              data={request.fromUserId}
              requestId={request._id}
              key={request._id}
              handleRequest={handleRequest}
              type="ConnectionRequests"
              date={request.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsReceivedPage;
