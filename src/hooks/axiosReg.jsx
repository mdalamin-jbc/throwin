// axiosReg.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosReg = axios.create({
  baseURL: "https://throwin-backend.onrender.com/api/v1",
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosReg = () => {
  return axiosReg;
};

export default useAxiosReg;
