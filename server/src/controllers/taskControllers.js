const Task = require("../models/task.js");

// Create Task
const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      assignedTo,
      projectId,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      projectId,
      dueDate
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "title");

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Task Status
const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    );

    res.status(200).json({
      message: "Task status updated",
      updatedTask
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
};