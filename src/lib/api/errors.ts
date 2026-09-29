import { AxiosError, isAxiosError } from "axios";

/**
 * Turn any error from an API call into a message a user can read.
 * Never returns an empty string (that's what caused blank error toasts:
 * `new Error(undefined)` when the server sent no `message`, or when the
 * request never reached the server at all).
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const data = axiosError.response?.data;

    // 1. The backend's own message
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
    if (typeof data === "string" && data.trim() && !data.trim().startsWith("<")) {
      return data; // some routes use res.send("text")
    }

    // 2. No response at all: server down, CORS, no internet
    if (!axiosError.response) {
      if (axiosError.code === "ECONNABORTED") {
        return "The server took too long to respond. Please try again.";
      }
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        return "You're offline. Check your internet connection.";
      }
      return "Can't reach the server right now. Please try again in a moment.";
    }

    // 3. Known status codes without a message
    switch (axiosError.response.status) {
      case 400:
        return "Some details are missing or invalid.";
      case 401:
        return "Your session has expired. Please log in again.";
      case 403:
        return "You don't have permission to do that.";
      case 404:
        return "Not found.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      default:
        if (axiosError.response.status >= 500) {
          return "The server ran into a problem. Please try again later.";
        }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallback;
};

/** An Error that remembers the HTTP status (undefined = no response). */
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const toApiError = (error: unknown, fallback?: string): ApiError =>
  new ApiError(
    getApiErrorMessage(error, fallback),
    isAxiosError(error) ? error.response?.status : undefined
  );
