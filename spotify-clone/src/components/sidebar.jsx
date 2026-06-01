import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white h-screen p-5">
      <h1 className="text-3xl font-bold text-green-500 mb-10">
        Spotify
      </h1>

      <ul className="space-y-5">
        <li className="cursor-pointer hover:text-green-500">
          Home
        </li>

        <li className="cursor-pointer hover:text-green-500">
          Search
        </li>

        <li className="cursor-pointer hover:text-green-500">
          Your Library
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;