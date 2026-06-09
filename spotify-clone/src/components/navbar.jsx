import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <h2 className="text-white text-2xl font-bold">
        Good Morning
      </h2>

      <button className="bg-white px-5 py-2 rounded-full font-semibold">
        Upgrade
      </button>
    </div>
  );
};

export default Navbar;