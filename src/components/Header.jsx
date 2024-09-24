import React from "react";
import { FaSearch, FaBell, FaUser, FaFolder } from "react-icons/fa";

const Header = () => {
  return (
    <header className="text-black m-5 p-4 flex justify-between items-center">
      {/* Left section with Folder icon and Logo */}
      <div className="flex items-center space-x-3">
        <FaFolder className="text-2xl text-orange-500" />
        <h1 className="text-3xl font-bold">ProJet</h1>
      </div>

      {/* Right section with search bar, notification, and login icon */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-gray-100 text-gray-800 rounded-3xl px-3 py-3">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none border-none bg-transparent text-black px-2"
          />
          <FaSearch className="text-xl" />
        </div>
        <div className="w-10 h-10 rounded-full  bg-gray-100 flex items-center justify-center ">
          <FaBell className="text-xl bg-gray-100 cursor-pointer hover:text-blue-400" />
        </div>
        <div className="w-10 h-10 rounded-full  bg-gray-100 flex items-center justify-center ">
          <FaUser className="text-xl rounded  cursor-pointer hover:text-blue-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
