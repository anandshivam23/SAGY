import Complaint from "../models/Complaint.js";

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch {
    res.status(500).json([]);
  }
};

export const addComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id
    });
    res.status(201).json(complaint);
  } catch {
    res.status(400).json({ message: "Add failed" });
  }
};

export const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    complaint.status = "Resolved";
    await complaint.save();
    res.json(complaint);
  } catch {
    res.status(400).json({ message: "Resolve failed" });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};
