import express from "express";
import { getUsers, updateUserRole, addUser, deleteUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/all", protect, adminOnly, getUsers);
router.put("/role/:id", protect, adminOnly, updateUserRole);
router.post("/add", protect, adminOnly, addUser);
router.delete("/delete/:id", protect, adminOnly, deleteUser);

export default router;
