import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://throwin-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
