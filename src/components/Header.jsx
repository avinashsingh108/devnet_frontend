import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUsers,
  FaUserPlus,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { MdRssFeed } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../constants";
import { removeUser } from "../store/userSlice";
import { IoChatboxEllipses, IoSettingsSharp } from "react-icons/io5";

function Header() {
  const user = useSelector((store) => store.user);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login", { replace: true });
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <header className="bg-gradient-to-r absolute top-0 left-0 right-0 from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:px-10 md:px-14 lg:px-16 2xl:px-40 shadow-lg">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold hover:text-gray-300 transition-colors"
        >
          <img src="logo.png" className="size-9 " />
        </Link>

        {user && (
          <div className="flex items-center space-x-4">
            <img
              onClick={handleMenu}
              src={user?.profilePic}
              alt="User Profile"
              className="size-11 object-cover cursor-pointer rounded-full border border-gray-700 transition-all"
            />

            <div
              className={`fixed top-0 ${
                showMenu ? "translate-x-0" : "translate-x-full"
              } w-80 right-0 z-40 h-full flex flex-col bg-gray-900 shadow-lg transition-transform duration-300 p-6 text-lg font-semibold space-y-4 whitespace-nowrap`}
            >
              <button
                className="flex justify-center border-b-2 border-gray-800 p-2 w-full text-gray-300 hover:text-white  transition-all"
                onClick={handleMenu}
              >
                <AiOutlineClose className="text-2xl" />
              </button>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/"
              >
                <FaHome className="mr-3" /> Home
              </Link>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/feed"
              >
                <MdRssFeed className="mr-3 text-2xl" /> Feed
              </Link>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/profile"
              >
                <FaUser className="mr-3" /> Profile
              </Link>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/chat"
              >
                <IoChatboxEllipses className="mr-3 text-xl" /> Chats
              </Link>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/connections"
              >
                <FaUsers className="mr-3" /> All Connections
              </Link>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/connectionRequests"
              >
                <FaUserPlus className="mr-3" /> Connection Requests
              </Link>
              <Link
                className="hover:bg-gray-700 px-4 py-3 rounded-lg flex items-center transition-all"
                to="/account-settings"
              >
                <IoSettingsSharp className="mr-3" /> Account Settings
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-red-600 px-4 py-3 rounded-lg flex items-center text-red-400 hover:text-white transition-all"
              >
                <FaSignOutAlt className="mr-3" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleMenu}
        ></div>
      )}
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="text-white text-lg font-semibold flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin mb-4"></div>
            Logging out...
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
