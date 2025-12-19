import express from "express";
import {
  addComplaint,
  getComplaints,
  resolveComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/add", protect, addComplaint);
router.get("/all", protect, getComplaints);
router.put("/resolve/:id", protect, resolveComplaint); // officer allowed
router.delete("/delete/:id", protect, adminOnly, deleteComplaint);

export default router;
