import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";

const TaskTable = ({ tasks, handleDeleteTask, handleEditTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which row is being edited
  const [editedTask, setEditedTask] = useState({});
  const [bulkEditMode, setBulkEditMode] = useState(false); // Track bulk edit mode
  const [selectedTasks, setSelectedTasks] = useState([]); // Track selected rows
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Track modal visibility

  // Toggle bulk edit mode
  const handleBulkEditToggle = () => {
    setBulkEditMode(!bulkEditMode);
    setSelectedTasks([]); // Reset selected tasks when toggling mode
  };

  // Handle row checkbox toggle
  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  // Handle editing a task
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ ...task });
  };

  // Handle saving the edited task
  const handleSaveClick = () => {
    handleEditTask(editingTaskId, editedTask);
    setEditingTaskId(null);
  };

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditedTask({ ...editedTask, [field]: e.target.value });
  };

  // Show delete confirmation modal
  const handleBulkDeleteClick = () => {
    if (selectedTasks.length > 0) {
      setShowDeleteModal(true);
    }
  };

  // Confirm deletion of selected tasks
  const handleConfirmDelete = () => {
    selectedTasks.forEach((taskId) => handleDeleteTask(taskId));
    setSelectedTasks([]); // Reset selected tasks after deletion
    setShowDeleteModal(false); // Close the modal after deleting
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the selected tasks?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Today</h2>
        <div className="flex items-center">
          <span className="text-gray-500">Total | 05:32:59</span>
          <button
            className="ml-4 text-blue-500 px-6 py-2 bg-blue-200 rounded-3xl"
            onClick={handleBulkEditToggle}
          >
            {bulkEditMode ? "Cancel" : "Bulk edit"}
          </button>
          {bulkEditMode && (
            <button
              className="ml-4 text-red-500 px-6 py-2 bg-red-200 rounded-3xl"
              onClick={handleBulkDeleteClick}
              disabled={selectedTasks.length === 0}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <table className="w-full table-auto border-collapse">
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              {bulkEditMode && (
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </td>
              )}
              <td className="px-4 py-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.task}
                    onChange={(e) => handleInputChange(e, "task")}
                    className="border border-gray-300 text-center w-full rounded-lg"
                  />
                ) : (
                  task.task
                )}
              </td>
              <td className="px-4 py-2 text-green-500">● {task.project}</td>
              <td className="px-4 py-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.start}
                    onChange={(e) => handleInputChange(e, "start")}
                    className="border border-gray-300 text-center w-16 rounded-lg"
                  />
                ) : (
                  task.start
                )}
              </td>
              <td className="px-4 py-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.end}
                    onChange={(e) => handleInputChange(e, "end")}
                    className="border border-gray-300 text-center w-16 rounded-lg"
                  />
                ) : (
                  task.end
                )}
              </td>
              <td className="px-4 py-2">
                <FaCalendarAlt className="text-orange-500" />
              </td>
              <td className="px-4 py-2">{task.duration}</td>
              <td className="px-4 py-2 flex space-x-2">
                {editingTaskId === task.id ? (
                  <button className="text-green-500" onClick={handleSaveClick}>
                    Save
                  </button>
                ) : (
                  <button
                    className="text-orange-500"
                    onClick={() => handleEditClick(task)}
                  >
                    <FaEdit />
                  </button>
                )}
                {!bulkEditMode && (
                  <button
                    className="text-orange-500"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
