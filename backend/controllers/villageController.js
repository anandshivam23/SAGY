import Village from "../models/Village.js";

export const getVillages = async (req, res) => {
  try {
    const villages = await Village.find();
    res.json(villages);
  } catch {
    res.status(500).json([]);
  }
};

export const addVillage = async (req, res) => {
  try {
    const { name, population, issues } = req.body;
    console.log("Adding Village:", { name, population, issues });
    const village = await Village.create({ name, population, issues });
    res.status(201).json(village);
  } catch (error) {
    console.error("Add Village Error:", error);
    res.status(400).json({ message: "Add failed" });
  }
};

export const deleteVillage = async (req, res) => {
  try {
    console.log("Deleting Village:", req.params.id);
    const deleted = await Village.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Village not found" });
    res.json({ message: "Village deleted" });
  } catch (error) {
    console.error("Delete Village Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
