import React, { useState } from "react";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";

const Header = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <header className="text-black m-5 p-4 flex justify-between items-center">
      {/* Logo and app name */}
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-bold">ProJet</h1>
      </div>

      {/* User Dropdown */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-gray-100 text-gray-800 rounded-3xl px-3 py-3">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none border-none bg-transparent text-black px-2"
          />
          <FaSearch className="text-xl" />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <FaBell className="text-xl bg-gray-100 cursor-pointer hover:text-blue-400" />
        </div>
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaUser className="text-xl rounded hover:text-blue-400" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
