import React from "react";

const EmptyFeed = ({fetchUsers}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col  text-white">
        <p className="text-2xl font-semibold">No more users to display!</p>
        <p className="text-sm mt-2">Check back later for new connections.</p>
      </div>

      <button
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition"
        onClick={fetchUsers}
      >
        Refresh Feed
      </button>
    </div>
  );
};

export default EmptyFeed;
