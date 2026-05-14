const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");

// Create Task
router.post("/", authMiddleware, createTask);

// Get All Tasks
router.get("/", authMiddleware, getTasks);

// Update Task Status
router.patch("/:id", authMiddleware, updateTaskStatus);

// Delete Task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;