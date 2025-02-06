import ConnectionList from "../components/ConnectionList";
import ChatRoom from "../components/ChatRoom";
import { useParams } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";

const ChatPage = () => {
  const { targetUserId } = useParams();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 lg:px-10 xl:px-28 md:pt-20 lg:pt-24 xl:pt-32 xl:pb-10 ">
      <div className={`md:block ${targetUserId ? "hidden" : "block"} md:w-2/5`}>
        <ConnectionList />
      </div>

      <div
        className={`${!targetUserId ? "hidden md:block" : "block"} md:w-full`}
      >
        {targetUserId ? (
          <ChatRoom />
        ) : (
          <div className="hidden md:flex flex-1 flex-col items-center lg:rounded-r-xl justify-center bg-gray-700 text-gray-200 h-full">
            <IoChatboxEllipses className="text-7xl" />
            <p className="text-2xl font-semibold">
              Select a user to start chatting
            </p>
            <p className="text-gray-400 mt-2">
              Connect and collaborate with fellow developers
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
