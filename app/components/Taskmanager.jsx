// Inside your PWAStatus component or a new component that manages the UI:

import useTaskStore from "../stores/useTaskStore";
import React, { useEffect } from "react";

export default function Taskmanager() {
  // Select state and actions from the store
  const { taskList, isLoading, loadTasks, addTask, toggleTask } =
    useTaskStore();

  // Load tasks from Dexie when the component mounts
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">My Offline Tasks</h3>
      <button
        onClick={() => addTask(`New Task - ${Date.now()}`)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Task
      </button>

      {/* Render the list of tasks */}
      <ul className="space-y-2">
        {taskList.map((task) => (
          <li
            key={task.id}
            className={`cursor-pointer p-2 rounded ${
              task.isCompleted ? "bg-green-100 line-through" : "bg-gray-100"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            {task.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

// You would place <TaskManager /> inside your main HomePage component.
