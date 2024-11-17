import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://throwin-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
