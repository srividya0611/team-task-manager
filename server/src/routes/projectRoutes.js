const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects
} = require("../Controllers/projectControllers");

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

module.exports = router;