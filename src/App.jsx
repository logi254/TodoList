import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingTask(null);
  };

  const completeTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const uncompleteTask = (id) => {
    const uncompletedTask = completedTasks.find((task) => task.id === id);
    if (uncompletedTask) {
      setTasks([...tasks, uncompletedTask]); // Move back to tasks
      setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "white" : "black";
    document.body.style.color = darkMode ? "black" : "white";
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <nav className="nav navbar-expand-lg bg-blue-300 text-center">
        <div className="container-fluid">
          <a
            className="navbar-brand dark:text-white  font-serif ms-3  "
            href="#"
          >
            Todo App
          </a>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </div>
        </div>
      </nav>

      <div className="max-w-fit mx-auto mt-8 rounded-xl p-8 bg-blue-300">
        <div className="flex gap-2 mb-5">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="border rounded p-2 flex-1 border-black text-black"
          />
          <button
            onClick={addTask}
            className="bg-yellow-400 dark:bg-yellow-600 text-white rounded px-4 py-2"
          >
            Add
          </button>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center p-3 mb-2 border rounded"
            >
              {editingTask === task.id ? (
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-3 p-2 border rounded text-black px-2 py-2"
                />
              ) : (
                <span className="flex-auto text-black">{task.text}</span>
              )}
              <div className="flex gap-2">
                {editingTask === task.id ? (
                  <button
                    onClick={() => saveTask(task.id)}
                    className="bg-green-500 dark:bg-green-700 text-white rounded px-4 py-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => editTask(task)}
                    className="bg-yellow-500 dark:bg-yellow-600 text-white rounded px-4 py-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => completeTask(task.id)}
                  className="bg-blue-500 dark:bg-blue-700 text-white rounded px-2 py-2"
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 dark:bg-red-700 text-white rounded px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>

        {completedTasks.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white mt-4 mb-2">
              Completed Tasks
            </h2>
            <ul>
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 mb-2 border rounded bg-gray-600"
                >
                  <span className="flex-auto text-white line-through">
                    {task.text}
                  </span>
                  <button
                    onClick={() => uncompleteTask(task.id)}
                    className="bg-orange-500 dark:bg-orange-700 text-white rounded px-4 py-2"
                  >
                    UnComplete
                  </button>
                </div>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
