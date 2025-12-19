import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Add User
export const addUser = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
    });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Update User Role
export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );
  res.json(updated);
};

// Delete User
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
