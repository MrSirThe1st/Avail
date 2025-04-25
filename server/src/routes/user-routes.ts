import express from "express";
import {
  getUserProfile,
  createOrUpdateUser,
  updateUserMetadata,
} from "../controllers/user-controller";
import { requireAuth } from "../middleware/clerk-auth";

const router = express.Router();

// Protected routes - require authentication
router.get("/profile", requireAuth(), getUserProfile);
router.post("/profile", requireAuth(), createOrUpdateUser);
router.patch("/metadata", requireAuth(), updateUserMetadata);

export default router;
