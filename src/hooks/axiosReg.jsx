// axiosReg.js
import axios from "axios";

const axiosReg = axios.create({
  baseURL: "http://54.238.181.96:8000",
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
