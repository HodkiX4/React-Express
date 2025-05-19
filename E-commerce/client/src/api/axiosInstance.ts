import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Create Axios instance
export const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token && config.url?.startsWith('/protected/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor for error handling
API.interceptors.response.use(
  (response) => response,  // No change on successful response
  (error) => {
    const { response } = error;
    let errorMessage = "An unexpected error occurred";
    const statusCode = response?.status;
    
    if (statusCode === 400) {
      errorMessage = response?.data?.message || "Bad request, please check your input.";
    } else if (statusCode === 401) {
      errorMessage = response?.data?.message || "Unauthorized. Please login again.";
    } else if (statusCode === 404) {
      errorMessage = response?.data?.message || "Resource not found.";
    } else if (statusCode === 500) {
      errorMessage = response?.data?.message || "Server error. Please try again later.";
    }

    // Custom error handling based on specific errors
    if (response?.data?.message) {
      errorMessage = response?.data?.message;
    }

    // Log the error (could integrate with a logging service like Sentry or LogRocket)
    console.error(`API Error: ${errorMessage}`);

    // Optionally, show a user-friendly error message in the UI
    // displayErrorToUser(errorMessage); // You can replace this with your error display function

    return Promise.reject(new Error(errorMessage));  // Reject with the error message
  }
);
