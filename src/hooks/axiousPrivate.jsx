import axios from "axios";
import { useAuth } from "./useAuth";
const getCsrfToken = () => {
  const name = "csrftoken";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const axiosPrivate = axios.create({
  baseURL: "https://api-dev.throwin-glow.com",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCsrfToken(),
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

const useAxiosPrivate = () => {
  const { user } = useAuth();
  const accessToken = user?.access;

  // Interceptor to add Authorization header for logged-in users
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
