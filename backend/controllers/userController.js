import User from "../models/User.js";

// Admin: get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Admin: update role
export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json({ message: "Role updated" });
};

// Admin: add user
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("Admin Adding User:", { name, email, role });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Important: Hash password even for admin-created users
    const bcrypt = (await import("bcryptjs")).default;
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Admin Add User Error:", error);
    res.status(500).json({ message: "Failed to add user" });
  }
};

// Admin: delete user
export const deleteUser = async (req, res) => {
  try {
    console.log("Admin Deleting User:", req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Admin Delete User Error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
