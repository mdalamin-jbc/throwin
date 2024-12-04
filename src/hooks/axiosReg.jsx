// axiosReg.js
import axios from "axios";

const axiosReg = axios.create({
  baseURL: "http://176.34.7.102:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosReg = () => {
  return axiosReg;
};

export default useAxiosReg;
