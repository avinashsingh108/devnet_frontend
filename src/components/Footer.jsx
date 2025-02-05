import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r shadow-lg from-gray-900 via-gray-800 to-gray-900 text-white lg:px-28 py-6">
      <div className="container mx-auto text-center flex justify-between items-center px-6">
        <p className="text-lg sm:text-xl font-semibold">DevNet</p>

        <div className="flex justify-center space-x-2 md:space-x-6">
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

        <div className="flex justify-center space-x-2 md:space-x-6">
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
