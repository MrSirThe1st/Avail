import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Calendar, ExternalLink } from "lucide-react";

interface WidgetProps {
  userId: string;
  showDays?: number;
  theme?: "light" | "dark" | "auto";
  size?: "small" | "medium" | "large";
  actionUrl?: string;
  actionLabel?: string;
}

interface TimeSlot {
  date: string;
  start: string;
  end: string;
}

interface DayAvailability {
  date: string;
  dayOfWeek: string;
  isAvailable: boolean;
  availableSlots: TimeSlot[];
}

// Mock data for now - eventually this will come from the API
const mockAvailabilityData: DayAvailability[] = [
  {
    date: "2025-04-27",
    dayOfWeek: "Sunday",
    isAvailable: false,
    availableSlots: [],
  },
  {
    date: "2025-04-28",
    dayOfWeek: "Monday",
    isAvailable: true,
    availableSlots: [
      { date: "2025-04-28", start: "09:00", end: "12:00" },
      { date: "2025-04-28", start: "14:00", end: "17:00" },
    ],
  },
  {
    date: "2025-04-29",
    dayOfWeek: "Tuesday",
    isAvailable: true,
    availableSlots: [{ date: "2025-04-29", start: "09:00", end: "17:00" }],
  },
  {
    date: "2025-04-30",
    dayOfWeek: "Wednesday",
    isAvailable: true,
    availableSlots: [{ date: "2025-04-30", start: "13:00", end: "17:00" }],
  },
  {
    date: "2025-05-01",
    dayOfWeek: "Thursday",
    isAvailable: false,
    availableSlots: [],
  },
  {
    date: "2025-05-02",
    dayOfWeek: "Friday",
    isAvailable: true,
    availableSlots: [{ date: "2025-05-02", start: "09:00", end: "12:00" }],
  },
  {
    date: "2025-05-03",
    dayOfWeek: "Saturday",
    isAvailable: false,
    availableSlots: [],
  },
];

const AvailabilityWidget: React.FC<WidgetProps> = ({
  userId,
  showDays = 7,
  theme = "light",
  size = "medium",
  actionUrl = "",
  actionLabel = "Contact Me",
}) => {
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Determine widget size classes
  const sizeClasses = {
    small: "max-w-xs text-sm",
    medium: "max-w-sm",
    large: "max-w-md",
  };

  // Determine theme classes
  const themeClasses =
    theme === "auto"
      ? "" // Auto theme will use system preference
      : theme === "dark"
        ? "dark bg-gray-800 text-white"
        : "bg-white text-gray-800";

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);

        // In a real implementation, we would fetch from the API
        // const response = await axios.get(`/api/availability/public/${userId}`);
        // setAvailability(response.data);

        // For now, use mock data
        setTimeout(() => {
          setAvailability(mockAvailabilityData.slice(0, showDays));
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load availability data");
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [userId, showDays]);

  const formatDateForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeForDisplay = (timeString: string): string => {
    // Convert 24h format to 12h format
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getAvailabilityStatus = (day: DayAvailability): string => {
    if (!day.isAvailable) return "Unavailable";
    if (day.availableSlots.length === 0) return "Unavailable";

    // If the day has a single slot covering standard work hours
    if (
      day.availableSlots.length === 1 &&
      day.availableSlots[0].start <= "09:30" &&
      day.availableSlots[0].end >= "16:30"
    ) {
      return "Available All Day";
    }

    return "Partially Available";
  };

  const toggleDayDetails = (date: string) => {
    if (selectedDay === date) {
      setSelectedDay(null);
    } else {
      setSelectedDay(date);
    }
  };

  if (loading) {
    return (
      <div
        className={`avail-widget rounded-lg shadow-md p-4 ${sizeClasses[size]} ${themeClasses}`}
      >
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`avail-widget rounded-lg shadow-md p-4 ${sizeClasses[size]} ${themeClasses}`}
      >
        <div className="text-red-500 text-center py-2">{error}</div>
      </div>
    );
  }

  return (
    <div
      className={`avail-widget rounded-lg shadow-md p-4 ${sizeClasses[size]} ${themeClasses}`}
    >
      <div className="mb-4 pb-2 border-b">
        <h3 className="font-semibold text-center">My Availability</h3>
      </div>

      <div className="space-y-2">
        {availability.map((day) => (
          <div key={day.date} className="border-b pb-2 last:border-b-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleDayDetails(day.date)}
            >
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <span>
                  {day.dayOfWeek.substring(0, 3)},{" "}
                  {formatDateForDisplay(day.date)}
                </span>
              </div>
              <div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    day.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {getAvailabilityStatus(day)}
                </span>
              </div>
            </div>

            {selectedDay === day.date && day.isAvailable && (
              <div className="mt-2 pl-6 text-sm">
                {day.availableSlots.length > 0 ? (
                  <div className="space-y-1">
                    {day.availableSlots.map((slot, index) => (
                      <div key={index} className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-500" />
                        <span>
                          {formatTimeForDisplay(slot.start)} -{" "}
                          {formatTimeForDisplay(slot.end)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No available time slots</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {actionUrl && (
        <div className="mt-4 pt-2 border-t">
          <a
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {actionLabel} <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      )}

      <div className="mt-4 text-xs text-center text-gray-500">
        Powered by Avail
      </div>
    </div>
  );
};

export default AvailabilityWidget;
