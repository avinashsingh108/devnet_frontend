import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../constants";
import { IoCaretBackOutline } from "react-icons/io5";

const socket = io(BASE_URL);

const ChatRoom = () => {
  const { targetUserId } = useParams();
  const user = useSelector((state) => state.user);
  const userName = user?.firstName;
  const userId = user?._id;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toUserInfo, setToUserInfo] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const room = [userId, targetUserId].sort().join("-");
    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leaveRoom", room);
      socket.off("receiveMessage");
    };
  }, [userId, targetUserId]);

  const fetchToUserData = async () => {
    try {
      const userData = await axios.post(
        BASE_URL + "/user/profile",
        { userId: targetUserId },
        { withCredentials: true }
      );
      setToUserInfo(userData.data);
    } catch (error) {
      // console.log("Error fetching user data:", error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/chat/history",
        { targetUserId },
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      // console.log("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (userId && targetUserId) {
      fetchToUserData();
      fetchChatHistory();
    }
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      firstName: userName,
      senderId: { _id: userId },
      receiver: targetUserId,
      message: message,
      createdAt: new Date(),
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  return (
    <div className="w-full bg-gray-700 lg:rounded-r-xl shadow-xl flex flex-col h-full max-md:pt-10 max-md:h-screen">
      <div className="flex justify-between bg-gray-900 max-md:pt-12 text-white p-4 border-b lg:rounded-tr-xl border-gray-700 shadow-md">
        <div className="flex items-center ">
          <BsChatDots className="text-2xl mr-2 text-gray-200" />
          <h2 className="text-xl font-semibold">
            {toUserInfo ? (
              <span>
                {toUserInfo.firstName}{" "}
                {toUserInfo.lastName && toUserInfo.lastName}
              </span>
            ) : (
              <span className="animate-pulse">Loading...</span>
            )}
          </h2>
        </div>
        <button
          onClick={() => navigate("/chat")}
          className="md:hidden p-2 rounded-lg text-xl bg-gray-800 text-white flex items-center gap-2"
        >
          <IoCaretBackOutline />
        </button>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-gray-800">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.senderId._id === userId ? "justify-end" : "justify-start"
              }`}
            >
              {msg.senderId._id !== userId && (
                <img
                  src={toUserInfo?.profilePic}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
              )}

              <div
                className={`p-4 rounded-2xl max-w-xs md:max-w-lg ${
                  msg.senderId._id === userId
                    ? "bg-gray-900 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <span className="text-xs block text-gray-300 text-right mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-900 px-5 py-3 flex items-center border-t lg:rounded-br-xl border-gray-700">
        <input
          type="text"
          className="flex-1 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none placeholder-gray-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 bg-gray-700 text-white p-3 hover:bg-gray-600 rounded-lg transition"
          onClick={sendMessage}
        >
          <FaArrowUp className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
