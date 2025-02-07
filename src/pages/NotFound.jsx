import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-white bg-gray-800 hover:bg-gray-950 rounded-lg px-6 py-2 text-lg">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
