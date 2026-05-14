import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Tasks
  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            authorization: token
          }
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Create Task
  const createTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      alert("Task Created");

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  // Delete Task
  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            authorization: token
          }
        }
      );

      alert("Task Deleted");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  // Update Status
  const updateStatus = async (id, status) => {

    try {

      await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Create Task
        </h2>

        <form onSubmit={createTask}>

          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Create Task
          </button>

        </form>

      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Tasks
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow-md"
            >

              <h3 className="text-xl font-bold mb-2">
                {task.title}
              </h3>

              <p className="text-gray-600 mb-3">
                {task.description}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Status:
                </span>
                {" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-600 font-bold"
                      : "text-yellow-600 font-bold"
                  }
                >
                  {task.status}
                </span>
              </p>

              <p className="mb-4">
                <span className="font-semibold">
                  Assigned To:
                </span>
                {" "}
                {task.assignedTo?.name}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    updateStatus(task._id, "completed")
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    updateStatus(task._id, "pending")
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Pending
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Dashboard;