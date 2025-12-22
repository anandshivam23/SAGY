import express from "express";
import {
    getProjects,
    addProject,
    updateProject,
    deleteProject
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/all", getProjects);
router.post("/add", protect, adminOnly, addProject);
router.put("/update/:id", protect, adminOnly, updateProject);
router.delete("/delete/:id", protect, adminOnly, deleteProject);

export default router;
