// axiosReg.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosReg = axios.create({
  baseURL: "https://throwin-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to fetch CSRF token
export const fetchCSRFToken = async () => {
  try {
    await axiosReg.get("/auth/register/consumer");
    console.log("CSRF token fetched successfully.");
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

// Interceptor to add CSRF token to request headers
axiosReg.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrftoken");
  console.log("Retrieved CSRF Token from Cookies:", csrfToken);
  if (csrfToken) {
    config.headers["X-CSRFTOKEN"] = csrfToken;
  }
  return config;
});

const useAxiosReg = () => {
  return axiosReg;
};

export default useAxiosReg;
