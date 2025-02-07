import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsersToFeed, removeUserFromFeed } from "../store/feedSlice";
import UserCard from "../components/UserCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import EmptyFeed from "../components/EmptyFeed";

const Feed = () => {
  const dispatch = useDispatch();
  const usersInFeed = useSelector((store) => store.feed.users);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addUsersToFeed(response.data.users));
    } catch (error) {
      // console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!usersInFeed || usersInFeed.length === 0) {
      fetchUsers();
    }
  }, []);

  const handleRequest = async (status, toUserId) => {
    try {
      setIsRequesting(true);
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        null,
        {
          withCredentials: true,
        }
      );

      toast.success(
        status === "interested"
          ? "Connection request sent!"
          : "You’ve skipped this user."
      );

      dispatch(removeUserFromFeed(toUserId));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes("already exists")
      ) {
        toast(
          "You have a pending request from this user. Click 'View' to respond.",
          {
            action: {
              label: "View",
              onClick: () => navigate("/connectionRequests"),
            },
          }
        );
      } else {
        // console.error("Error sending request:", error);
        toast.error("Failed to send request. Please try again.");
      }
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2 items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="ml-4 text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center pt-6 sm:pt-16">
      {usersInFeed && usersInFeed.length > 0 && (
        <div className="max-sm:text-left max-sm:px-6">
          <h1 className="text-white text-2xl font-semibold mb-1">
            Find Your Network
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Connect with like-minded people and expand your circle!
          </p>
        </div>
      )}
      {usersInFeed && usersInFeed.length > 0 ? (
        <UserCard
          user={usersInFeed[0]}
          handleRequest={handleRequest}
          isRequesting={isRequesting}
          type="feedCard"
        />
      ) : (
        <EmptyFeed fetchUsers={fetchUsers} />
      )}
    </div>
  );
};

export default Feed;
