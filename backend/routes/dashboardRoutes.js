import express from "express";
import Village from "../models/Village.js";
import Project from "../models/Project.js";
import Complaint from "../models/Complaint.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  const villages = await Village.countDocuments();
  const projects = await Project.countDocuments();
  const completed = await Project.countDocuments({ status: "Completed" });
  const complaints = await Complaint.countDocuments({ status: "Pending" });

  res.json({
    villages,
    projects,
    completed,
    complaints,
  });
});

export default router;
