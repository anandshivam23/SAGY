import express from "express";
import {
  getComplaints,
  addComplaint,
  resolveComplaint,
  deleteComplaint
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";
import { officerOrAdmin } from "../middleware/officerOrAdmin.js";

const router = express.Router();

router.get("/all", getComplaints);              // PUBLIC
router.post("/add", protect, addComplaint);
router.put("/resolve/:id", protect, officerOrAdmin, resolveComplaint);
router.delete("/delete/:id", protect, adminOnly, deleteComplaint);

export default router;
