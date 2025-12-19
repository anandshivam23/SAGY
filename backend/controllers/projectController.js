import Project from "../models/Project.js";

export const addProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

export const getProjects = async (req, res) => {
  const data = await Project.find();
  res.json(data);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
