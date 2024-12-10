import axios from "axios";
import { useAuth } from "./useAuth";

const axiosPrivate = axios.create({
  baseURL: "http://176.34.7.102:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  // Ensure cookies are sent with requests
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
