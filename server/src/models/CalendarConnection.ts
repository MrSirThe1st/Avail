import mongoose, { Document, Schema } from "mongoose";

export interface CalendarConnectionDocument extends Document {
  userId: string;
  provider: "google" | "outlook" | "apple" | "other";
  providerAccountId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: Date;
  calendarId?: string;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const CalendarConnectionSchema = new Schema<CalendarConnectionDocument>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    provider: {
      type: String,
      required: true,
      enum: ["google", "outlook", "apple", "other"],
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    tokenExpiry: {
      type: Date,
      required: true,
    },
    calendarId: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for user and provider
CalendarConnectionSchema.index({ userId: 1, provider: 1 }, { unique: true });

const CalendarConnection =
  mongoose.models.CalendarConnection ||
  mongoose.model<CalendarConnectionDocument>(
    "CalendarConnection",
    CalendarConnectionSchema
  );

export default CalendarConnection;
