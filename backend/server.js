import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import villageRoutes from "./routes/villageRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// CREATE DEFAULT ADMIN IF NOT EXISTS
const createAdminUser = async () => {
  const exists = await User.findOne({ email: "admin@sagy.com" });

  if (!exists) {
    await User.create({
      name: "Main Admin",
      email: "admin@sagy.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });
    console.log("🔥 Default Admin Created: admin@sagy.com / admin123");
  } else {
    console.log("✔ Admin already exists");
  }
};
createAdminUser();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
