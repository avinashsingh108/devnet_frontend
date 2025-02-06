import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r shadow-lg from-gray-900 via-gray-800 to-gray-900 text-white py-6 ">
      <div className=" mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 md:space-y-0 sm:px-10 md:px-14 lg:px-28 2xl:px-40">
        <div className="flex space-x-10">
          <Link
            to="/"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            About
          </Link>
          <Link
            to="/privacy-policy"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            Privacy
          </Link>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/avinashsingh108"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300 text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/avinashs46"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300 text-2xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
