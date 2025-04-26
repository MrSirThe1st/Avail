// client/src/pages/dashboard/calendar-connections.tsx
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import Layout from "../../components/layout/layout";
import { Button } from "../../components/ui/button";
import { CalendarX, Calendar, Check, X } from "lucide-react";

interface CalendarConnection {
  _id: string;
  provider: "google" | "outlook" | "apple" | "other";
  isActive: boolean;
  createdAt: string;
}

const CalendarConnectionsPage: React.FC = () => {
  const [connections, setConnections] = useState<CalendarConnection[]>([]);

  const {
    fetch: fetchConnections,
    loading,
    error,
  } = useApi<CalendarConnection[]>({
    url: "/calendars",
    method: "GET",
  });

  const {
    fetch: toggleStatus,
  } = useApi<{ success: boolean }>({
    url: "/calendars/:id/status",
    method: "PATCH",
  });

  const {
    fetch: removeConnection,
  } = useApi<{ success: boolean }>({
    url: "/calendars/:id",
    method: "DELETE",
  });

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const response = await fetchConnections();
        if (response?.data) {
          setConnections(response.data);
        }
      } catch (error) {
        console.error("Failed to load calendar connections", error);
      }
    };

    loadConnections();
  }, [fetchConnections]);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await toggleStatus();
      if (response?.data?.success) {
        setConnections(
          connections.map((conn) =>
            conn._id === id ? { ...conn, isActive: !currentStatus } : conn
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle calendar status", error);
    }
  };

  const handleRemoveConnection = async (id: string) => {
    if (confirm("Are you sure you want to remove this calendar connection?")) {
      try {
        const response = await removeConnection();
        if (response?.data?.success) {
          setConnections(connections.filter((conn) => conn._id !== id));
        }
      } catch (error) {
        console.error("Failed to remove calendar connection", error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Calendar Connections</h1>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
              Failed to load calendar connections. Please try again.
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Connect Your Calendars
              </h2>
              <p className="text-gray-600 mb-4">
                Link your calendars to show your real-time availability.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="flex items-center gap-2">
                  <Calendar size={18} />
                  Google Calendar
                </Button>
                <Button className="flex items-center gap-2" variant="secondary">
                  <Calendar size={18} />
                  Outlook Calendar
                </Button>
                <Button className="flex items-center gap-2" variant="secondary">
                  <Calendar size={18} />
                  Apple Calendar
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : connections.length > 0 ? (
              <div>
                <h3 className="font-medium mb-4">Your Connected Calendars</h3>
                <div className="border rounded-md divide-y">
                  {connections.map((connection) => (
                    <div
                      key={connection._id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">
                          {connection.provider.charAt(0).toUpperCase() +
                            connection.provider.slice(1)}{" "}
                          Calendar
                        </div>
                        <div className="text-sm text-gray-500">
                          Connected{" "}
                          {new Date(connection.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={
                            connection.isActive ? "default" : "secondary"
                          }
                          size="sm"
                          onClick={() =>
                            handleToggleStatus(
                              connection._id,
                              connection.isActive
                            )
                          }
                        >
                          {connection.isActive ? (
                            <>
                              <Check size={16} className="mr-1" /> Active
                            </>
                          ) : (
                            <>
                              <X size={16} className="mr-1" /> Inactive
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveConnection(connection._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <CalendarX size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No calendars connected yet. Connect a calendar to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarConnectionsPage;
