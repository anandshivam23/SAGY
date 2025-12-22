import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
  name: String,
  population: Number,
  issues: String
}, { timestamps: true });

export default mongoose.model("Village", villageSchema);
