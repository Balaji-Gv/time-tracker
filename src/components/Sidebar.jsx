import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineClockCircle,
  AiOutlineFileText,
} from "react-icons/ai";

const Sidebar = () => {
  const location = useLocation(); // Get current route

  // Function to determine if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 text-black p-5">
      <ul>
        <li
          className={`mb-6 flex items-center ${
            isActive("/")
              ? "bg-orange-500 px-2 py-2 rounded-2xl text-white"
              : ""
          }`}
        >
          <AiOutlineHome className="mr-2 text-2xl" />
          <Link
            to="/"
            className={` text-xl ${isActive("/") ? "text-white" : ""}`}
          >
            Home
          </Link>
        </li>
        <li
          className={`mb-6 flex items-center ${
            isActive("/about")
              ? "bg-orange-500 px-2 py-2 rounded-2xl text-white"
              : ""
          }`}
        >
          <AiOutlineInfoCircle className="mr-2 text-2xl" />
          <Link
            to="/about"
            className={` text-xl ${isActive("/about") ? "text-white" : ""}`}
          >
            About
          </Link>
        </li>
        <li
          className={`mb-6 flex items-center ${
            isActive("/timeTracker")
              ? "bg-orange-500 px-2 py-2 rounded-2xl text-white"
              : ""
          }`}
        >
          <AiOutlineClockCircle className="mr-2 text-2xl" />
          <Link
            to="/timeTracker"
            className={` text-xl ${
              isActive("/timeTracker") ? "text-white" : ""
            }`}
          >
            Time Tracker
          </Link>
        </li>
        <li
          className={`flex items-center ${
            isActive("/timeSheet")
              ? "bg-orange-500 px-2 py-2 rounded-2xl text-white"
              : ""
          }`}
        >
          <AiOutlineFileText className="mr-2 text-2xl" />
          <Link
            to="/timeSheet"
            className={` text-xl ${isActive("/timeSheet") ? "text-white" : ""}`}
          >
            Time Sheet
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
