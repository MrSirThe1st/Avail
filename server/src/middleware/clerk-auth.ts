import { Request, Response, NextFunction } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

// Export requireAuth directly as it already handles everything we need
export { requireAuth };

// Helper function to get userId from request for convenience
export const getUserId = (req: Request): string | null => {
  try {
    const auth = getAuth(req);
    return auth.userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};
