import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./axiosPublic";

const UseGetByStaffName = (username) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: staff = {}, // Corrected destructuring, with default as an empty object
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff", username],
    queryFn: async () => {
      const res = await axiosPublic.get(`/auth/users/staff/${username}`);
      return res.data;
    },
    enabled: !!username, // Only run if username is provided
  });

  return { staff, refetch, isLoading, isError };
};

export default UseGetByStaffName;
