import express from "express";
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/add", protect, adminOnly, addProject);
router.get("/all", protect, getProjects);
router.put("/update/:id", protect, adminOnly, updateProject);
router.delete("/delete/:id", protect, adminOnly, deleteProject);

export default router;
