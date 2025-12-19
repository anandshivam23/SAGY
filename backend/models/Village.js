import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
  name: String,
  population: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Village", villageSchema);
