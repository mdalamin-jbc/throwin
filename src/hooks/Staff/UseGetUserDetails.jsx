import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axiosPublic";

const UseGetUserDetails = (username, store_code) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: staff_details = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff_details", store_code, username],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/auth/users/store/${store_code}/staff/${username}`
      );
      return res.data;
    },
    enabled: !!username && !!store_code,
  });

  return { staff_details, refetch, isLoading, isError };
};

export default UseGetUserDetails;
