import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://api-dev.throwin-glow.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
