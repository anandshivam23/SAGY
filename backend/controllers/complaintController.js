import Complaint from "../models/Complaint.js";

export const addComplaint = async (req, res) => {
  const complaint = await Complaint.create(req.body);
  res.json(complaint);
};

export const getComplaints = async (req, res) => {
  const data = await Complaint.find();
  res.json(data);
};

export const resolveComplaint = async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: "Resolved" },
    { new: true }
  );
  res.json(updated);
};

export const deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
