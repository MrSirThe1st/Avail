// server/src/controllers/calendar-controller.ts
import { Request, Response } from "express";
import { getUserId } from "../middleware/clerk-auth";
import CalendarConnection from "../models/CalendarConnection";

// List all calendar connections for a user
export const listCalendarConnections = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const connections = await CalendarConnection.find({ userId: clerkId });

    res.status(200).json(connections);
  } catch (error) {
    console.error("Error fetching calendar connections:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific calendar connection
export const getCalendarConnection = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);
    const { id } = req.params;

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const connection = await CalendarConnection.findOne({
      _id: id,
      userId: clerkId,
    });

    if (!connection) {
      res.status(404).json({ message: "Calendar connection not found" });
      return;
    }

    res.status(200).json(connection);
  } catch (error) {
    console.error("Error fetching calendar connection:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a calendar connection
export const removeCalendarConnection = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);
    const { id } = req.params;

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const connection = await CalendarConnection.findOneAndDelete({
      _id: id,
      userId: clerkId,
    });

    if (!connection) {
      res.status(404).json({ message: "Calendar connection not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Calendar connection removed successfully" });
  } catch (error) {
    console.error("Error removing calendar connection:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle active status of a calendar connection
export const toggleCalendarConnectionStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);
    const { id } = req.params;
    const { isActive } = req.body;

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (typeof isActive !== "boolean") {
      res.status(400).json({ message: "isActive must be a boolean" });
      return;
    }

    const connection = await CalendarConnection.findOneAndUpdate(
      { _id: id, userId: clerkId },
      { isActive },
      { new: true }
    );

    if (!connection) {
      res.status(404).json({ message: "Calendar connection not found" });
      return;
    }

    res.status(200).json(connection);
  } catch (error) {
    console.error("Error updating calendar connection:", error);
    res.status(500).json({ message: "Server error" });
  }
};
