import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white h-screen p-5">
      <div className="">
        <h1 className="text-3xl font-bold text-green-500 mb-10">
        <img className="logo w-10  bg-black text-white h-10" src="https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_640.jpg"/>
        Spotify
      </h1>
      </div>
      
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