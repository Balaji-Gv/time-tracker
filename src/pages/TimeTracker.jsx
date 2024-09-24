import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  IoCalendarOutline,
  IoChevronBackCircleOutline,
  IoChevronForward,
} from "react-icons/io5";

const TimeTracker = () => {
  // select project model section
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Handle closing the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // timer section

  const [isRunning, setIsRunning] = useState(false); // Track whether the timer is running
  const [time, setTime] = useState(0); // Track the time in seconds
  const [isManual, setIsManual] = useState(false); // Checkbox toggle state
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false); // Modal open state

  // Start/Stop the timer
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Toggle the manual mode (Checkbox change)
  const handleToggle = () => {
    setIsManual(!isManual);
    setIsTimerModalOpen(!isTimerModalOpen); // Open/close timer modal
  };

  // Format time into HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Run the timer every second if it's running
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [isRunning]);

  // State for bulk edit mode, selected rows, and delete modal
  const [bulkEdit, setBulkEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // State for "select all" checkbox
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Data array for tasks
  const tasks = [
    {
      id: 1,
      task: "DSM",
      project: "Cricmatch",
      start: "06:20",
      end: "06:50",
      duration: "00:50:26",
    },
    {
      id: 2,
      task: "BREAK",
      project: "Project B",
      start: "06:20",
      end: "06:50",
      duration: "00:50:26",
    },
    {
      id: 3,
      task: "Description",
      project: "Project B",
      start: "06:20",
      end: "06:50",
      duration: "00:50:26",
    },
    {
      id: 4,
      task: "Meeting",
      project: "Lets Dine",
      start: "06:20",
      end: "06:50",
      duration: "00:50:26",
    },
  ];

  // Toggle bulk edit mode
  const handleBulkEdit = () => {
    setBulkEdit(!bulkEdit);
    setSelectedRows([]); // Reset selected rows
    setSelectAll(false); // Reset select all checkbox
  };

  // Handle row selection
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tasks.map((task) => task.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle delete confirmation
  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  // Confirm deletion and close modal
  const confirmDelete = () => {
    console.log("Deleted rows:", selectedRows); // Perform the actual deletion logic here
    setShowDeleteModal(false);
    setSelectedRows([]);
    setBulkEdit(false);
    setSelectAll(false);
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      {/* Header - Breadcrumbs */}
      <div className="flex items-center mb-5">
        <button className="text-gray-500 flex items-center">
          <IoChevronBackCircleOutline className="mr-1 size-7  text-orange-500" />
          Home
        </button>
        <span className="ml-2 text-orange-500 flex items-center">
          <IoChevronForward className="mr-1" />
          Time Tracker
        </span>
      </div>
      {/* Input and Timer Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="What have you worked on?"
            className="border border-gray-300 rounded-3xl py-2 px-4 flex-1"
          />

          <div className="relative inline-block">
            {/* Custom Select Box */}
            <div
              className="border border-orange-500 text-orange-400 rounded-3xl py-2 px-6 cursor-pointer flex justify-between items-center"
              onClick={toggleModal}
            >
              <span>Select Project *</span>
              <FaChevronDown className="text-orange-400 ml-8" />
            </div>

            {/* Modal with Search Box and Project List */}
            {isModalOpen && (
              <div
                ref={modalRef}
                className="absolute mt-2 bg-white border border-orange-400 rounded-lg shadow-lg p-4 z-10"
              >
                {/* Search Input with Icon */}
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search project or client"
                    className="outline-none flex-grow"
                  />
                  <FaSearch className="text-gray-400 mr-2" />
                </div>

                {/* Favorites Section */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-gray-600 font-semibold">FAVORITES</h3>
                    <span className="text-gray-400">1 project</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-2">●</span> Cricmatch
                    </div>
                    <div className="flex items-center">
                      <button className="text-orange-400 mr-2">
                        Create task
                      </button>
                      <FaStar className="text-orange-400" />
                    </div>
                  </div>
                </div>

                {/* No Client Section */}
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-gray-600 font-semibold">NO CLIENT</h3>
                    <span className="text-gray-400">3 projects</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-2">●</span> Cricmatch
                    </div>
                    <div className="flex items-center">
                      <button className="text-orange-400 mr-2">
                        Create task
                      </button>
                      <FaStar className="text-orange-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">●</span> Project B
                    </div>
                    <div className="flex items-center">
                      <button className="text-orange-400 mr-2">
                        Create task
                      </button>
                      <FaStar className="text-orange-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">●</span> Others
                    </div>
                    <div className="flex items-center">
                      <button className="text-orange-400 mr-2">
                        Create task
                      </button>
                      <FaStar className="text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mt-4 lg:mt-0 relative">
          {/* Timer Display */}
          <p className="text-xl px-4 py-2 bg-gray-200 rounded-3xl font-semibold">
            {formatTime(time)}
          </p>

          {/* Start/Stop or Add Button */}
          <button
            className="ml-4 bg-orange-500 text-white py-2 px-6 rounded-3xl"
            onClick={handleStartStop}
          >
            {isManual ? "Add" : isRunning ? "Stop" : "Start"}
          </button>

          {/* Toggle Manual/Timer */}
          <div className="ml-4 flex items-center">
            <p className="mr-2">{isManual ? "Manual" : "Timer"}</p>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {/* Modal with Right-to-Left Animation */}
          {isTimerModalOpen && (
            <div
              className={`absolute right-full transform transition-transform duration-500 ${
                isTimerModalOpen ? "translate-x-0" : "translate-x-full"
              } bg-transparent  rounded-lg   flex items-center`}
            >
              {/* 6:20 Button */}
              <button className="bg-white text-black border border-gray-300 py-2 px-6 rounded-3xl mx-1">
                06:20
              </button>
              {/* 6:50 Button */}
              <button className="bg-white text-black border border-gray-300 py-2 px-6 rounded-3xl mx-1">
                06:50
              </button>
              {/* Today Button with Calendar Icon */}
              <button className="bg-white text-orange-500 border border-orange-500 py-2 px-6 rounded-3xl flex items-center ml-1 mr-3">
                <FaCalendarAlt className="mr-2" /> Today
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Time Entries Section */}
      <div className="flex justify-between mb-6 p-2">
        <div>This Week</div>
        <div>Week total | 5:32:59 </div>
      </div>
      {/* Time Entries Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {/* Checkbox for selecting all */}
            {bulkEdit && (
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2"
              />
            )}
            <h2 className="font-semibold">Today</h2>
            {bulkEdit && (
              <>
                <button
                  className="text-red-500 px-4 py-2 ml-10 bg-red-200 rounded-3xl"
                  onClick={handleDeleteSelected}
                >
                  Delete
                </button>
                <button
                  className="text-gray-500 px-4 py-2 ml-3 bg-gray-200 rounded-3xl"
                  onClick={handleBulkEdit}
                >
                  Bulk edit
                </button>
                <button
                  className="text-gray-500 px-4 py-2 ml-3 bg-gray-200 rounded-3xl"
                  onClick={handleBulkEdit}
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-gray-500">Total | 05:32:59</span>
              {!bulkEdit && (
                <button
                  className="ml-4 text-blue-500 px-6 py-2 bg-blue-200 rounded-3xl"
                  onClick={handleBulkEdit}
                >
                  Bulk edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Structure */}
        <table className="w-full table-auto border-collapse">
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                {bulkEdit && (
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(task.id)}
                      onChange={() => handleSelectRow(task.id)}
                    />
                  </td>
                )}
                <td className="px-4 py-2">{task.task}</td>
                <td className="px-4 py-2 text-green-500">● {task.project}</td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={task.start}
                    className="border border-gray-300 text-center w-16 rounded-lg"
                    readOnly
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={task.end}
                    className="border border-gray-300 text-center w-16 rounded-lg"
                    readOnly
                  />
                </td>
                <td className="px-4 py-2">
                  <IoCalendarOutline className="text-orange-500" />
                </td>
                <td className="px-4 py-2">{task.duration}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button className="text-orange-500">
                    <FaEdit />
                  </button>
                  <button className="text-orange-500">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete the selected rows?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Previous Days */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Yesterday</h2>
          <div className="flex items-center">
            <span className="text-gray-500">Total | 05:32:59</span>
            <button className="ml-4 text-blue-500 px-6 py-2 bg-blue-200 rounded-3xl">
              Bulk edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
