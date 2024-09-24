import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {
  IoCalendarOutline,
  IoChevronBack,
  IoChevronBackCircleOutline,
  IoChevronForward,
} from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const TimeSheet = () => {
  const [startDate, setStartDate] = useState(null); // State to hold the selected date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control the date picker visibility

  // State to hold the time entries for each day (Mon-Sun)
  const [timeEntries, setTimeEntries] = useState(Array(7).fill("00:00:00"));

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsDatePickerOpen(false); // Close date picker after selecting a date
  };

  const handleTimeChange = (index, value) => {
    const newEntries = [...timeEntries];
    newEntries[index] = value;
    setTimeEntries(newEntries);
  };

  // Function to calculate total time (HH:MM:SS format)
  const calculateTotalTime = (entries) => {
    let totalSeconds = entries.reduce((acc, time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return acc + hours * 3600 + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="text-gray-500 flex items-center">
            <IoChevronBackCircleOutline className="mr-1 size-7  text-orange-500" />
            Home
          </button>
          <span className="ml-2 text-orange-500 flex items-center">
            <IoChevronForward className="mr-1" />
            Timesheet
          </span>
        </div>
        <div>
          {/* Button with Calendar and Week Navigation */}
          <button
            className="flex items-center bg-orange-200 text-orange-600 rounded-full px-4 py-2"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} // Toggle date picker on calendar icon click
          >
            <IoCalendarOutline className="size-5" />
            <span className="m-2">
              {startDate ? format(startDate, "MMMM dd, yyyy") : "This Week"}
              {/* Display selected date or "This Week" */}
            </span>
            <IoChevronBack className="mr-1 ml-16" />
            <IoChevronForward className="mr-1" />
          </button>

          {/* Render DatePicker only when date picker is open */}
          {isDatePickerOpen && (
            <div className="absolute mt-2">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange} // Handle date change
                inline
              />
            </div>
          )}
        </div>
      </div>

      {/* Timesheet Table */}
      <table className="w-full text-center bg-white rounded-3xl shadow">
        <thead className=" text-gray-600">
          <tr className="border-b">
            <th className="p-6 text-left">Projects</th>
            <th className="p-4">
              Mon <br /> Aug 30
            </th>
            <th className="p-4">
              Tue <br /> Aug 31
            </th>
            <th className="p-4">
              Wed <br /> Sep 01
            </th>
            <th className="p-4">
              Thu <br /> Sep 02
            </th>
            <th className="p-4">
              Fri <br /> Sep 03
            </th>
            <th className="p-4">
              Sat
              <br /> Sep 04
            </th>
            <th className="p-4">
              Sun <br />
              Sep 05
            </th>
            <th className="p-4">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-6 text-left text-orange-500">
              <button className="flex items-center">
                <span className="mr-2 text-lg">
                  <CiCirclePlus className="size-6" />
                </span>
                Select Project
                <span className="text-red-500 ml-1">*</span>
              </button>
            </td>
            {/* Time entry fields */}
            {timeEntries.map((time, index) => (
              <td key={index} className="p-4">
                <input
                  type="text"
                  className="w-20 bg-gray-50 border border-gray-300 rounded-full p-2"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />
              </td>
            ))}
            <td className="p-4">{calculateTotalTime(timeEntries)}</td>
          </tr>
          {/* Total row */}
          <tr>
            <td className="p-6 font-semibold text-left">Total</td>
            {timeEntries.map((_, index) => (
              <td key={index} className="p-4">
                {timeEntries[index]}
              </td>
            ))}
            <td className="p-4 font-semibold">
              {calculateTotalTime(timeEntries)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TimeSheet;
