import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  budget: Number,
  status: { type: String, default: "Not Started" }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
