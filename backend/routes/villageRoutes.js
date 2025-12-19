import express from "express";
import {
  addVillage,
  getVillages,
  deleteVillage,
  updateVillage
} from "../controllers/villageController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/add", protect, adminOnly, addVillage);
router.get("/all", protect, getVillages);
router.put("/update/:id", protect, adminOnly, updateVillage);
router.delete("/delete/:id", protect, adminOnly, deleteVillage);

export default router;
