import axios from "axios";

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || (import.meta.env.PROD && envUrl.includes("localhost"))) {
    return "/api";
  }
  return envUrl;
};

// Axios instance for handling API requests with baseURL and credentials
const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Interceptor to automatically attach authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
