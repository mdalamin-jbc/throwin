import axios from "axios";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";


// ----------------------------

const axiosPrivate = axios.create({
  baseURL: "http://176.34.7.102:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { user } = useAuth();
  const accessToken = user?.access;
  // console.log(accessToken)

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
