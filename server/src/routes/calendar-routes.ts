// server/src/routes/calendar-routes.ts
import express from "express";
import {
  listCalendarConnections,
  getCalendarConnection,
  removeCalendarConnection,
  toggleCalendarConnectionStatus,
} from "../controllers/calendar-controller";
import { requireAuth } from "../middleware/clerk-auth";

const router = express.Router();

// All routes require authentication
router.use(requireAuth());

// List all calendar connections
router.get("/", listCalendarConnections);

// Get a specific calendar connection
router.get("/:id", getCalendarConnection);

// Remove a calendar connection
router.delete("/:id", removeCalendarConnection);

// Toggle active status of a calendar connection
router.patch("/:id/status", toggleCalendarConnectionStatus);

export default router;
