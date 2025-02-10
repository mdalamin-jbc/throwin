import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";

const UseGetStaffByStoreCode = (store_code) => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  console.log(store_code.store_code);

  const {
    refetch,
    data: staffListByStoreCode = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staff_list_by_storecode"], // Removed dynamic dependency
    queryFn: async () => {
      if (!user?.access) return []; // Ensure user is authenticated before making a request

      try {
        const response = await AxiosPrivate.get(
          `/restaurant-owner/store-staffs?store_code=${store_code.store_code}`
        );
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching  staff list by storecode:",
          error.response?.data || error.message
        );
        throw new Error(
          "Failed to fetch staff list by storecode. Please try again."
        );
      }
    },
    enabled: Boolean(user?.access), // Only run query if user is authenticated
  });
  //   console.log(restaurantStaffList);
  return { staffListByStoreCode, refetch, isLoading, isError, error };
};

export default UseGetStaffByStoreCode;
