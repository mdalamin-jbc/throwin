import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://54.238.181.96:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
