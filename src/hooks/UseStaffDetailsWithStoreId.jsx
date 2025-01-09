import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./axiosPublic";

const UseStaffDetailsWithStoreId = (name) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: staffStoreId = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staff-with-store-id", name],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `auth/users/store-user-search?name=${name}`
      );
      return res.data;
    },
    enabled: !!name,
  });

  if (isError) {
    console.error("Error fetching staff details:", error.message);
  }

  // If the array has at least one item, return the first item
  const storeId = staffStoreId[0] || null;

  console.log(storeId);

  return { storeId, name, refetch, isLoading, isError };
};

export default UseStaffDetailsWithStoreId;
