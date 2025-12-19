import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  issue: String,
  category: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Complaint", complaintSchema);
