import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./axiosPublic";

const UseGetStaffListByStaffName = (username) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: staffs = {}, 
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff_list_by_staff_name", username],
    queryFn: async () => {
      const res = await axiosPublic.get(`/auth/users/staff-list?${username}`);
      return res.data;
    },
    enabled: !!username, 
  });

  return { staffs, refetch, isLoading, isError };
};

export default UseGetStaffListByStaffName;
