const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  inviteMemberToProject
} = require("../controllers/projectController");


router.post("/", createProject);      // Create
router.get("/", getProjects);         // Read All
router.get("/:id", getProject);       // Read One
router.put("/:id", updateProject);    // Update
router.delete("/:id", deleteProject); // Delete

// Invite member to project
router.post("/:projectId/invite", inviteMemberToProject);

module.exports = router;
