// axiosReg.js
import axios from "axios";

const axiosReg = axios.create({
  baseURL: "https://api-dev.throwin-glow.com",
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
