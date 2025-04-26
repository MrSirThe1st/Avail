import express from "express";
import {
  getAvailabilitySettings,
  updateAvailabilitySettings,
} from "../controllers/availability-controller";
import { requireAuth } from "../middleware/clerk-auth";

const router = express.Router();

// All routes require authentication
router.use(requireAuth());

// Get availability settings
router.get("/settings", getAvailabilitySettings);

// Update availability settings
router.put("/settings", updateAvailabilitySettings);

export default router;
