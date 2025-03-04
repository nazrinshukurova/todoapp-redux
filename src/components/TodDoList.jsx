import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, removeItem, toggleTask } from "../store/actions";
import "./ToDoList.css";
import ellipse from "../assets/images/image.png";
import dogAndBoy from "../assets/images/image2.png";
import { FaTrash } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

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

  const handleEditItem = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editId !== null && editText.trim()) {
      dispatch(editItem(editId, editText));
      setEditId(null);
      setEditText("");
    }
  };

  const toggleItem = (id) => {
    dispatch(toggleTask(id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="todo-page">
      <img src={ellipse} className="ellipse" alt="Ellipse" />
      <div className="section-main">
        <div>
          <img src={dogAndBoy} className="dogAndBoy" alt="Dog and Boy" />
        </div>
        <div className="list-container">
          <div className="circle">
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
                  stroke="#55847A"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={
                    251.2 - (251.2 * completionPercentage) / 100
                  }
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="progress-text">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
          <h4>TODO tasks.</h4>
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
                  {editId === task.id ? (
                    <>
                      <input
                      className="edit-box"
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button className="save-button" onClick={handleSaveEdit}>Save</button>
                    </>
                  ) : (
                    <>
                      <span
                        onClick={() => toggleItem(task.id)}
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          cursor: "pointer",
                        }}
                      >
                        {task.text}
                      </span>
                      <div className="handle-buttons">
                        {" "}
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveItem(task.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="edit-button"
                          onClick={() => handleEditItem(task.id, task.text)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
