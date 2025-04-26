import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import Layout from "../../components/layout/layout";
import { Button } from "../../components/ui/button";
import { Clock, Save, Plus, X } from "lucide-react";
import timezones from "@/utils/timezones";

interface TimeRange {
  start: string;
  end: string;
}

interface DayAvailability {
  isAvailable: boolean;
  timeRanges: TimeRange[];
}

interface WeeklySchedule {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

interface DisplayOptions {
  showExactHours: boolean;
  lookAheadDays: number;
  showBusyReasons: boolean;
}

interface AvailabilitySettings {
  _id: string;
  userId: string;
  timezone: string;
  weeklySchedule: WeeklySchedule;
  displayOptions: DisplayOptions;
}

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const formatDayName = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

const AvailabilitySettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AvailabilitySettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const {
    fetch: fetchSettings,
    loading,
    error,
  } = useApi<AvailabilitySettings>({
    url: "/availability/settings",
    method: "GET",
  });

  const { fetch: updateSettings } = useApi<AvailabilitySettings>({
    url: "/availability/settings",
    method: "PUT",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetchSettings();
        if (response?.data) {
          setSettings(response.data);
        }
      } catch (err) {
        console.error("Failed to load availability settings", err);
      }
    };

    loadSettings();
  }, [fetchSettings]);

  const handleTimeRangeChange = (
    day: keyof WeeklySchedule,
    index: number,
    field: keyof TimeRange,
    value: string
  ) => {
    if (!settings) return;

    const updatedSettings = { ...settings };
    updatedSettings.weeklySchedule[day].timeRanges[index][field] = value;
    setSettings(updatedSettings);
  };

  const addTimeRange = (day: keyof WeeklySchedule) => {
    if (!settings) return;

    const updatedSettings = { ...settings };
    updatedSettings.weeklySchedule[day].timeRanges.push({
      start: "09:00",
      end: "17:00",
    });
    setSettings(updatedSettings);
  };

  const removeTimeRange = (day: keyof WeeklySchedule, index: number) => {
    if (!settings) return;

    const updatedSettings = { ...settings };
    updatedSettings.weeklySchedule[day].timeRanges.splice(index, 1);
    setSettings(updatedSettings);
  };

  const toggleDayAvailability = (day: keyof WeeklySchedule) => {
    if (!settings) return;

    const updatedSettings = { ...settings };
    updatedSettings.weeklySchedule[day].isAvailable =
      !updatedSettings.weeklySchedule[day].isAvailable;
    setSettings(updatedSettings);
  };

  const handleDisplayOptionChange = <K extends keyof DisplayOptions>(
    option: K,
    value: DisplayOptions[K]
  ) => {
    if (!settings) return;

    const updatedSettings = { ...settings };
    updatedSettings.displayOptions[option] = value;
    setSettings(updatedSettings);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!settings) return;

    const updatedSettings = { ...settings };
    updatedSettings.timezone = e.target.value;
    setSettings(updatedSettings);
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    try {
      setIsSaving(true);
      setSaveSuccess(false);
      setSaveError("");

      const response = await updateSettings({
        body: {
          timezone: settings.timezone,
          weeklySchedule: settings.weeklySchedule,
          displayOptions: settings.displayOptions,
        },
      });

      if (response?.data) {
        setSaveSuccess(true);
        setSettings(response.data);
      }
    } catch (err) {
      setSaveError("Failed to save settings. Please try again.");
      console.error("Failed to save availability settings", err);
    } finally {
      setIsSaving(false);

      // Clear success message after 3 seconds
      if (saveSuccess) {
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
              Failed to load availability settings. Please try again.
            </div>
            <Button onClick={() => fetchSettings()}>Retry</Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Availability Settings</h1>
            <Button
              className="flex items-center gap-2"
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <Save size={18} />
              )}
              Save Settings
            </Button>
          </div>

          {saveSuccess && (
            <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
              Settings saved successfully!
            </div>
          )}

          {saveError && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
              {saveError}
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Your Timezone</label>
              <select
                className="w-full p-2 border rounded-md"
                value={settings.timezone}
                onChange={handleTimezoneChange}
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                This will be used to correctly display your availability to
                clients in their local time.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Display Options</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showExactHours"
                    className="rounded text-primary focus:ring-primary mr-2"
                    checked={settings.displayOptions.showExactHours}
                    onChange={(e) =>
                      handleDisplayOptionChange(
                        "showExactHours",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="showExactHours">
                    Show exact hours of availability
                  </label>
                </div>

                <div>
                  <label className="block mb-1">
                    Show availability for the next:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      className="w-16 p-2 border rounded-md mr-2"
                      value={settings.displayOptions.lookAheadDays}
                      onChange={(e) =>
                        handleDisplayOptionChange(
                          "lookAheadDays",
                          parseInt(e.target.value) || 7
                        )
                      }
                    />
                    <span>days</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showBusyReasons"
                    className="rounded text-primary focus:ring-primary mr-2"
                    checked={settings.displayOptions.showBusyReasons}
                    onChange={(e) =>
                      handleDisplayOptionChange(
                        "showBusyReasons",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="showBusyReasons">
                    Show general reason when busy (e.g., "In a meeting")
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <p className="text-gray-600 mb-6">
              Set your regular working hours for each day of the week. This will
              be used as a baseline for your availability.
            </p>

            <div className="space-y-6">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <h3 className="font-medium">{formatDayName(day)}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={
                            settings.weeklySchedule[day as keyof WeeklySchedule]
                              .isAvailable
                          }
                          onChange={() =>
                            toggleDayAvailability(day as keyof WeeklySchedule)
                          }
                        />
                        <div className="relative w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        <span className="ms-3 text-sm font-medium">
                          {settings.weeklySchedule[day as keyof WeeklySchedule]
                            .isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </label>
                    </div>
                  </div>

                  {settings.weeklySchedule[day as keyof WeeklySchedule]
                    .isAvailable && (
                    <div className="pl-0">
                      {settings.weeklySchedule[
                        day as keyof WeeklySchedule
                      ].timeRanges.map((timeRange, index) => (
                        <div
                          key={index}
                          className="flex items-center mb-2 last:mb-0"
                        >
                          <Clock size={16} className="mr-2 text-gray-500" />
                          <input
                            type="time"
                            className="p-1 border rounded-md w-32"
                            value={timeRange.start}
                            onChange={(e) =>
                              handleTimeRangeChange(
                                day as keyof WeeklySchedule,
                                index,
                                "start",
                                e.target.value
                              )
                            }
                          />
                          <span className="mx-2">to</span>
                          <input
                            type="time"
                            className="p-1 border rounded-md w-32"
                            value={timeRange.end}
                            onChange={(e) =>
                              handleTimeRangeChange(
                                day as keyof WeeklySchedule,
                                index,
                                "end",
                                e.target.value
                              )
                            }
                          />
                          {settings.weeklySchedule[day as keyof WeeklySchedule]
                            .timeRanges.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() =>
                                removeTimeRange(
                                  day as keyof WeeklySchedule,
                                  index
                                )
                              }
                            >
                              <X size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-primary"
                        onClick={() =>
                          addTimeRange(day as keyof WeeklySchedule)
                        }
                      >
                        <Plus size={16} className="mr-1" /> Add Time Range
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AvailabilitySettingsPage;
