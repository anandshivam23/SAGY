import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  res.json(await Project.find());
};

export const addProject = async (req, res) => {
  try {
    const { name, category, budget, status } = req.body;
    console.log("Adding Project:", { name, category, budget, status });
    const project = await Project.create({ name, category, budget, status });
    res.status(201).json(project);
  } catch (error) {
    console.error("Add Project Error:", error);
    res.status(400).json({ message: "Failed to add project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, category, budget, status } = req.body;
    console.log("Updating Project:", req.params.id, { name, category, budget, status });
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, category, budget, status },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(400).json({ message: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    console.log("Deleting Project:", req.params.id);
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(400).json({ message: "Failed to delete project" });
  }
};
