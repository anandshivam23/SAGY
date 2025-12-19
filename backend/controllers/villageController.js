import Village from "../models/Village.js";

export const addVillage = async (req, res) => {
  const village = await Village.create(req.body);
  res.json(village);
};

export const getVillages = async (req, res) => {
  const data = await Village.find();
  res.json(data);
};

export const deleteVillage = async (req, res) => {
  await Village.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};

export const updateVillage = async (req, res) => {
  const updated = await Village.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
