import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// Base API URL from environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetch: () => Promise<void>;
}

// Default type for API responses if not specified
type DefaultResponse = Record<string, unknown>;

export function useApi<T = DefaultResponse>(
  options: ApiOptions
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { getToken } = useAuth();

  const fetch = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Get the authentication token from Clerk
      const token = await getToken();

      // Prepare the request config
      const config = {
        method: options.method || "GET",
        url: `${API_URL}${options.url}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: options.body,
        params: options.params,
      };

      // Make the request
      const response = await axios(config);
      setData(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err && "message" in err
            ? String(err.message)
            : "Unknown error occurred";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetch };
}
