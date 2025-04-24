import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Avail API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
