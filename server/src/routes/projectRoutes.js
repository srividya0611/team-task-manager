const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects
} = require("../Controllers/projectControllers");

// Create Project
router.post("/", authMiddleware, createProject);

// Get All Projects
router.get("/", authMiddleware, getProjects);

module.exports = router;