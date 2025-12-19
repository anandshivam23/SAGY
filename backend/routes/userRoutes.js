import express from "express";
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/add", protect, adminOnly, addUser);
router.get("/all", protect, adminOnly, getUsers);
router.put("/update/:id", protect, adminOnly, updateUser);
router.delete("/delete/:id", protect, adminOnly, deleteUser);

export default router;
