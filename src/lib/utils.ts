import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createErrorMessage = (error: unknown) => {
  // When Axios encounters an error during an HTTP request or response handling, it creates a specific Axios error object
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data;
    if (typeof apiError === "string" && (apiError as string).length > 0) {
      return apiError;
    }
    return apiError?.message || apiError?.error || error.message;
  }
  // Network errors
  // timeout errors
  // CORS errors
  if (error instanceof Error) {
    return error.message;
  }
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Generic error message";
};