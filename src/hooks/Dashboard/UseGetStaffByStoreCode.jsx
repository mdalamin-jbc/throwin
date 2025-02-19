import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetStaffByStoreCode = (store_code) => {
  const axiosPrivate = useAxiosPrivate();
  axiosPrivate;
  const { user } = useAuth();

  const {
    refetch,
    data: restaurantStaffListByStoreCode = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant_staff_list_by_store_code"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        const response = await axiosPrivate.get(
          `/restaurant-owner/store-staffs?store_code=${store_code.store_code}`
        );
        
        return response.data || [];
      } catch (error) {
        console.error(
          "Error fetching restaurant staff list:",
          error.response?.data || error.message
        );
        throw new Error("Failed to fetch staff list. Please try again.");
      }
    },
    enabled: Boolean(user?.access),
  });
  console.log(restaurantStaffListByStoreCode);

  return { restaurantStaffListByStoreCode, refetch, isLoading, isError, error };
};

export default UseGetStaffByStoreCode;
