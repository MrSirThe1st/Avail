import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import User, { UserDocument } from "../models/User";
import { getUserId } from "../middleware/clerk-auth";

// Get user profile from our database
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get user ID from the auth middleware
    const clerkId = getUserId(req);

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Find the user in our database
    const user = await User.findOne({ clerkId });

    if (!user) {
      res.status(404).json({ message: "User not found in database" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create or update user in our database when they sign in
export const createOrUpdateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Fetch user data from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    if (!clerkUser) {
      res.status(404).json({ message: "User not found in Clerk" });
      return;
    }

    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    );

    if (!primaryEmail) {
      res.status(400).json({ message: "User has no primary email address" });
      return;
    }

    const userData = {
      clerkId,
      email: primaryEmail.emailAddress,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      imageUrl: clerkUser.imageUrl,
      lastActive: new Date(),
      // Optional additional data from request body
      ...(req.body.metadata && { metadata: req.body.metadata }),
    };

    // Check if user exists in our DB
    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate({ clerkId }, userData, { new: true });
    } else {
      // Create new user
      user = await User.create(userData);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user metadata
export const updateUserMetadata = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clerkId = getUserId(req);
    const { metadata } = req.body;

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!metadata) {
      res.status(400).json({ message: "No metadata provided" });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: { metadata },
        lastActive: new Date(),
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user metadata:", error);
    res.status(500).json({ message: "Server error" });
  }
};
