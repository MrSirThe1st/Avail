import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db";
import userRoutes from "./routes/user-routes";
import calendarRoutes from "./routes/calendar-routes";
import availabilityRoutes from "./routes/availability-routes";

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("CLERK_SECRET_KEY is missing from environment variables");
}

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Initialize Clerk middleware globally
app.use(clerkMiddleware());

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Avail API" });
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/calendars", calendarRoutes);
app.use("/api/availability", availabilityRoutes);

// Global error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.error(err.stack);

  // Clerk specific errors
  if (err.status === 401 || err.name === "ClerkError") {
    res.status(401).json({ message: "Authentication error" });
    return;
  }

  res.status(500).json({ message: "Something went wrong!" });
};

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
