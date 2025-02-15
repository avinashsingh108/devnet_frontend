import { FaUsers, FaCommentDots, FaHandshake } from "react-icons/fa";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { addUser } from "../store/userSlice";

const LandingPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          const response = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
          });
          
          dispatch(addUser(response.data));
        }
      } catch (error) {
        //console.error(error);
      }
    };

    checkAuth();
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-x-6 max-lg:pb-10 xl:gap-x-16 justify-center items-center bg-gray-900 text-white px-6 sm:px-10 md:px-16 2xl:px-40">
      <div className="lg:w-3/5 md:text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 max-md:pt-28 max-lg:pt-36">
          Build Meaningful{" "}
          <span className="animated-gradient">Connections</span> & Elevate Your
          Career
        </h1>

        <p className="sm:text-lg text-gray-300 mb-4 sm:mb-6">
          DevNet is a dynamic networking platform for developers to connect,
          collaborate, and accelerate their careers.
        </p>

        <div className="sm:flex w-full flex-col hidden text-center sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
          <Link
            to="/feed"
            className="bg-gray-800 max-lg:flex-1 hover:bg-gray-700 px-5 py-2 rounded-lg font-medium transition shadow-md"
          >
            Get Started →
          </Link>
          <Link
            to="/about"
            className="bg-gray-800 max-lg:flex-1 hover:bg-gray-700 px-5 py-2 rounded-lg font-medium transition shadow-md"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-2/5 sm:mt-10 lg:mt-0 space-y-2 sm:space-y-4">
        <FeatureCard
          icon={<FaUsers className="text-purple-400" size={26} />}
          title="Find Like-Minded Developers"
          description="Discover and connect with developers who share your skills and interests."
        />
        <FeatureCard
          icon={<FaHandshake className="text-yellow-400" size={26} />}
          title="Simple & Smart Connections"
          description="Easily connect with developers by showing interest—no complicated forms or processes."
        />
        <FeatureCard
          icon={<FaCommentDots className="text-blue-400" size={26} />}
          title="Instant Messaging"
          description="Chat in real-time with your connections and collaborate on exciting projects."
        />
      </div>
      <div className="flex flex-col w-full sm:hidden text-center gap-2 sm:gap-4 pt-8 justify-center lg:justify-start">
        <Link
          to="/feed"
          className="bg-gray-800 flex-1 hover:bg-gray-700 px-5 py-2 rounded-lg font-medium transition shadow-md"
        >
          Get Started →
        </Link>
        <Link
          to="/about"
          className="bg-gray-800 flex-1 hover:bg-gray-700 px-5 py-2 rounded-lg font-medium transition shadow-md"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
