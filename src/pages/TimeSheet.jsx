import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {
  IoCalendarOutline,
  IoChevronBackCircleOutline,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";

const TimeSheet = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedProjectRows, setSelectedProjectRows] = useState([]); // Now initially empty
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const projects = [
    "Project A",
    "Project B",
    "Project C",
    "Project D",
    "Project E",
    "Project F",
  ];

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsDatePickerOpen(false);
  };

  const handleTimeChange = (rowIndex, dayIndex, value) => {
    const cleanValue = value.replace(/[^0-9]/g, "").slice(0, 8); // Keep only digits and limit to 8 characters
    const updatedRows = [...selectedProjectRows];

    // Update timeEntries with the new formatted value
    updatedRows[rowIndex].timeEntries[dayIndex] = formatTime(cleanValue);
    setSelectedProjectRows(updatedRows);
  };

  const formatTime = (value) => {
    let formattedValue = "";

    if (value.length >= 2) {
      formattedValue += value.slice(0, 2) + ":"; // Add hours
    } else if (value.length > 0) {
      formattedValue += value; // Partial hours
    }

    if (value.length >= 4) {
      formattedValue += value.slice(2, 4) + ":"; // Add minutes
    } else if (value.length > 2) {
      formattedValue += value.slice(2); // Partial minutes
    }

    if (value.length >= 6) {
      formattedValue += value.slice(4, 6); // Add seconds
    } else if (value.length > 4) {
      formattedValue += value.slice(4); // Partial seconds
    }

    return formattedValue;
  };

  const handleFocus = (e) => {
    const input = e.target;
    const value = input.value;

    // Focus on the next input field if the current one is filled
    if (value.length === 2) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const calculateTotalTime = (entries) => {
    let totalSeconds = entries.reduce((acc, time) => {
      if (time === "") return acc; // Skip empty entries
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

  const handlePrevWeek = () => {
    setStartDate((prevDate) => subDays(prevDate, 7));
  };

  const handleNextWeek = () => {
    setStartDate((prevDate) => addDays(prevDate, 7));
  };

  const getWeekDates = (startDate) => {
    return Array.from({ length: 6 }, (_, i) =>
      format(addDays(startDate, i), "EEE MMM dd")
    );
  };

  const weekDates = getWeekDates(startDate);

  const handleProjectSelect = (project) => {
    if (
      !project ||
      selectedProjectRows.some((row) => row.project === project)
    ) {
      setErrorMessage(
        "Please select a project that has not already been selected."
      );
    } else {
      const newRow = {
        project,
        timeEntries: Array(6).fill(""), // Start with empty strings instead of "00:00:00"
      };
      setSelectedProjectRows([...selectedProjectRows, newRow]);
      setErrorMessage("");
    }
    setIsProjectDropdownOpen(false);
  };

  const handleRemoveProject = (project) => {
    setSelectedProjectRows(
      selectedProjectRows.filter((row) => row.project !== project)
    );
  };

  const calculateColumnTotals = () => {
    const columnTotals = Array(6).fill("");
    selectedProjectRows.forEach((row) => {
      row.timeEntries.forEach((time, index) => {
        if (time !== "") {
          const [hours, minutes, seconds] = time.split(":").map(Number);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          const [currentHours, currentMinutes, currentSeconds] = columnTotals[
            index
          ]
            .split(":")
            .map(Number);
          const currentTotalSeconds =
            (currentHours || 0) * 3600 +
            (currentMinutes || 0) * 60 +
            (currentSeconds || 0);
          const newTotalSeconds = currentTotalSeconds + totalSeconds;

          columnTotals[index] = calculateTotalTime([
            `${String(Math.floor(newTotalSeconds / 3600)).padStart(
              2,
              "0"
            )}:${String(Math.floor((newTotalSeconds % 3600) / 60)).padStart(
              2,
              "0"
            )}:${String(newTotalSeconds % 60).padStart(2, "0")}`,
          ]);
        }
      });
    });
    return columnTotals;
  };

  const columnTotals = calculateColumnTotals();

  const calculateRowTotal = (timeEntries) => {
    return calculateTotalTime(timeEntries);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="text-gray-500 flex items-center">
            <IoChevronBackCircleOutline className="mr-1 size-7 text-orange-500" />
            Home
          </button>
          <span className="ml-2 text-orange-500 flex items-center">
            <IoChevronForward className="mr-1" />
            Timesheet
          </span>
        </div>
        <div>
          <div className="flex items-center bg-orange-200 text-orange-600 rounded-full px-4 py-2">
            <IoCalendarOutline
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="size-5 cursor-pointer"
            />
            <span className="m-2">
              {startDate ? format(startDate, "MMMM dd, yyyy") : "This Week"}
            </span>
            <IoChevronBack
              className="mr-1 ml-16 cursor-pointer"
              onClick={handlePrevWeek}
            />
            <IoChevronForward
              className="mr-1 cursor-pointer"
              onClick={handleNextWeek}
            />
          </div>

          {isDatePickerOpen && (
            <div className="absolute mt-2">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}
        </div>
      </div>

      <table className="w-full text-center bg-white rounded-3xl shadow">
        <thead className="text-gray-600">
          <tr className="border-b">
            <th className="p-6 text-left">Projects</th>
            {weekDates.map((date, index) => (
              <th key={index} className="p-4">
                {date}
              </th>
            ))}
            <th className="p-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedProjectRows.length > 0 ? (
            selectedProjectRows.map((row, rowIndex) => (
              <tr className="border-b" key={row.project}>
                <td className="p-6 text-left text-orange-500">
                  <div className="flex items-center justify-between">
                    {row.project}
                    <button
                      className="ml-2 text-red-600"
                      onClick={() => handleRemoveProject(row.project)}
                    >
                      &times;
                    </button>
                  </div>
                </td>

                {row.timeEntries.map((time, dayIndex) => (
                  <td key={dayIndex} className="p-4">
                    <input
                      type="text"
                      className="w-20 bg-gray-50 border border-gray-300 rounded-full p-1 text-center"
                      value={time}
                      placeholder="00:00:00"
                      onChange={(e) =>
                        handleTimeChange(rowIndex, dayIndex, e.target.value)
                      }
                      onFocus={handleFocus}
                    />
                  </td>
                ))}
                <td className="p-4">{calculateRowTotal(row.timeEntries)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="p-6">
                No projects selected. Please add a project.
              </td>
            </tr>
          )}
        </tbody>
        {selectedProjectRows.length > 0 && (
          <tfoot className="border-t">
            <tr className="text-gray-500">
              <td className="p-6 text-left">Total</td>
              {columnTotals.map((total, index) => (
                <td key={index} className="p-4">
                  {total}
                </td>
              ))}
              <td className="p-4">
                {calculateTotalTime(
                  columnTotals.map((total) =>
                    total === "" ? "00:00:00" : total
                  )
                )}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      <div className="flex items-center mt-4">
        <div className="relative">
          <button
            className="flex px-4 py-2 bg-orange-200 rounded-3xl items-center text-orange-500"
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
          >
            <CiCirclePlus className="mr-2 size-6" />
            Add Project
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-lg w-64">
              <ul>
                {projects.map((project) => (
                  <li
                    key={project}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProjectSelect(project)}
                  >
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="ml-4 text-red-600 text-sm">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default TimeSheet;
