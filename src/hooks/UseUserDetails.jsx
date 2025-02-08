import useAxiosPublic from "./axiosPublic";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const UseUserDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    refetch,
    isLoading,
    data: userDetails = {},
  } = useQuery({
    queryKey: ["userData", user?.access],
    queryFn: async () => {
      const res = await axiosPublic.get(`/auth/users/me`, {
        headers: user?.access ? { Authorization: `Bearer ${user.access}` } : {},
        ...(user?.access && { withCredentials: true }),
      });
      return res.data;
    },
    enabled: !!user?.access,
  });

  return { userDetails, refetch, isLoading };
};

export default UseUserDetails;
