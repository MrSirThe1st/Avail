import mongoose, { Document, Schema } from "mongoose";

export interface TimeRange {
  start: string; // Format: HH:MM (24-hour)
  end: string; // Format: HH:MM (24-hour)
}

export interface DayAvailability {
  isAvailable: boolean;
  timeRanges: TimeRange[];
}

export interface AvailabilitySettingsDocument extends Document {
  userId: string;
  timezone: string;
  weeklySchedule: {
    monday: DayAvailability;
    tuesday: DayAvailability;
    wednesday: DayAvailability;
    thursday: DayAvailability;
    friday: DayAvailability;
    saturday: DayAvailability;
    sunday: DayAvailability;
  };
  displayOptions: {
    showExactHours: boolean;
    lookAheadDays: number;
    showBusyReasons: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TimeRangeSchema = new Schema<TimeRange>(
  {
    start: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    end: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  },
  { _id: false }
);

const DayAvailabilitySchema = new Schema<DayAvailability>(
  {
    isAvailable: {
      type: Boolean,
      default: true,
    },
    timeRanges: {
      type: [TimeRangeSchema],
      default: [{ start: "09:00", end: "17:00" }],
    },
  },
  { _id: false }
);

const AvailabilitySettingsSchema = new Schema<AvailabilitySettingsDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    timezone: {
      type: String,
      required: true,
      default: "UTC",
    },
    weeklySchedule: {
      monday: {
        type: DayAvailabilitySchema,
        default: {
          isAvailable: true,
          timeRanges: [{ start: "09:00", end: "17:00" }],
        },
      },
      tuesday: {
        type: DayAvailabilitySchema,
        default: {
          isAvailable: true,
          timeRanges: [{ start: "09:00", end: "17:00" }],
        },
      },
      wednesday: {
        type: DayAvailabilitySchema,
        default: {
          isAvailable: true,
          timeRanges: [{ start: "09:00", end: "17:00" }],
        },
      },
      thursday: {
        type: DayAvailabilitySchema,
        default: {
          isAvailable: true,
          timeRanges: [{ start: "09:00", end: "17:00" }],
        },
      },
      friday: {
        type: DayAvailabilitySchema,
        default: {
          isAvailable: true,
          timeRanges: [{ start: "09:00", end: "17:00" }],
        },
      },
      saturday: {
        type: DayAvailabilitySchema,
        default: { isAvailable: false, timeRanges: [] },
      },
      sunday: {
        type: DayAvailabilitySchema,
        default: { isAvailable: false, timeRanges: [] },
      },
    },
    displayOptions: {
      showExactHours: {
        type: Boolean,
        default: true,
      },
      lookAheadDays: {
        type: Number,
        default: 7,
        min: 1,
        max: 30,
      },
      showBusyReasons: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const AvailabilitySettings =
  mongoose.models.AvailabilitySettings ||
  mongoose.model<AvailabilitySettingsDocument>(
    "AvailabilitySettings",
    AvailabilitySettingsSchema
  );

export default AvailabilitySettings;
