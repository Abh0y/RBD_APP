import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // Base URL for all requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging line

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
