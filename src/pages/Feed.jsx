import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsersToFeed, removeUserFromFeed } from "../store/feedSlice";
import UserCard from "../components/UserCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
      console.log(response.data);

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
          ? "You have expressed interest!"
          : "You have ignored this user."
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
    <div className="bg-gray-900 min-h-screen flex items-center justify-center pt-20">
      {usersInFeed && usersInFeed.length > 0 ? (
        <UserCard
          user={usersInFeed[0]}
          handleRequest={handleRequest}
          isRequesting={isRequesting}
          type="feedCard"
        />
      ) : (
        <div className="flex flex-col  text-white">
          <p className="text-2xl font-semibold">No more users to display!</p>
          <p className="text-sm mt-2">Check back later for new connections.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
