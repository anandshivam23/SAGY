import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  category: String,
  budget: Number,
  status: { type: String, default: "Not Started" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema);
