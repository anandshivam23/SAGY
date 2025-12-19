import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. User check
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  // 2. Password check
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Incorrect password" });

  // 3. Create JWT Token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
  });
};
