import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, toggleTask } from "../store/actions";
import "./ToDoList.css";

const ToDoList = () => {
  const [task, setTask] = useState("");

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (task.trim()) {
      dispatch(addItem(task));
      setTask("");
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const toggleItem = (id) => {
    dispatch(toggleTask(id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="list-container">
      <h2>To-Do List</h2>

      {/* Progress Circle */}
      <div className="progress-container">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#ddd"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="green"
            strokeWidth="10"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * completionPercentage) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="progress-text">
          {Math.round(completionPercentage)}%
        </span>
      </div>

      <div className="list-box">
        <input
          className="task-box"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
        />
        <button className="add-button" onClick={handleAddItem}>
          Add
        </button>

        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span
                onClick={() => toggleItem(task.id)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {task.text}
              </span>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(task.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
