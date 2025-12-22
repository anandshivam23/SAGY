import express from "express";
import { getVillages, addVillage, deleteVillage } from "../controllers/villageController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/all", getVillages);                // PUBLIC
router.post("/add", protect, adminOnly, addVillage);
router.delete("/delete/:id", protect, adminOnly, deleteVillage);

export default router;
