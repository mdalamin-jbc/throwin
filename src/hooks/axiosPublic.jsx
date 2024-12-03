import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://176.34.7.102:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
