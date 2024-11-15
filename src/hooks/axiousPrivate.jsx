import axios from "axios";
import { useAuth } from "./useAuth";

const axiosPrivate = axios.create({
  baseURL: "https://throwin-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

const useAxiosPrivate = () => {
  const { user } = useAuth(); 
  const accessToken = user?.access;  

  // Interceptor to add Authorization header
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
