import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center pt-16 px-4 md:px-0">
      <div className="max-w-5xl w-full px-2 md:px-6 py-6 text-white">
        <div className="md:text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold pt-8 sm:pt-10 mb-2 sm:mb-4">
            About DevNet
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Connecting developers through collaboration, networking, and
            meaningful discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">
          <div>
            <h2 className="text-2xl font-bold mb-3">Who We Are</h2>
            <p className="text-gray-300 leading-relaxed">
              DevNet is a simple way for developers to connect with like-minded
              individuals. Whether you're looking for team members, mentors, or
              just a chat, we make it easy to find the right people.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-white font-bold mb-3">
              Why Use DevNet?
            </h2>
            <ul className="text-gray-300 space-y-2">
              <li>- Find developers based on skills and interests</li>
              <li>- Send and accept connection requests</li>
              <li>- Chat with your network</li>
              <li>- No complicated features, just simple connections</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-400">
            Ready to connect with other developers?
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-800 hover:bg-gray-950 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Get Started
          </button>
        </div>

        <div className="mt-16 sm:text-center border-t border-gray-700 pt-4">
          <h2 className="text-2xl font-bold mb-4">About the Creator</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            DevNet was built by{" "}
            <a
              href="https://www.linkedin.com/in/avinashs46"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Avinash Singh
            </a>{" "}
            while learning the MERN stack. This project was created as a
            portfolio piece to demonstrate full-stack development skills while
            providing a useful platform for developers to connect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
