import { Request, Response } from "express";
import { getUserId } from "../middleware/clerk-auth";
import AvailabilitySettings from "../models/AvailabilitySettings";

// Get a user's availability settings
export const getAvailabilitySettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Find settings or create default if not exists
    let settings = await AvailabilitySettings.findOne({ userId: clerkId });

    if (!settings) {
      // Create with defaults
      settings = await AvailabilitySettings.create({ userId: clerkId });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching availability settings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update availability settings
export const updateAvailabilitySettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { timezone, weeklySchedule, displayOptions } = req.body;

    // Validate request body
    if (!timezone && !weeklySchedule && !displayOptions) {
      res.status(400).json({ message: "No update data provided" });
      return;
    }

    // Build update object
    const updateData: Record<string, any> = {};

    if (timezone) updateData.timezone = timezone;
    if (weeklySchedule) updateData.weeklySchedule = weeklySchedule;
    if (displayOptions) updateData.displayOptions = displayOptions;

    // Find and update settings, create if not exists
    const settings = await AvailabilitySettings.findOneAndUpdate(
      { userId: clerkId },
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json(settings);
  } catch (error) {
    console.error("Error updating availability settings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
