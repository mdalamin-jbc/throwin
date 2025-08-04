import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";

const UseGetRestaurantStaffList = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: restaurantStaffList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant_staff_list"], // Removed dynamic dependency
    queryFn: async () => {
      if (!user?.access) return []; // Ensure user is authenticated before making a request

      try {
        const response = await AxiosPrivate.get("/restaurant-owner/staff");
        return response.data.results; // Extract results array directly
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

  return { restaurantStaffList, refetch, isLoading, isError, error };
};

export default UseGetRestaurantStaffList;
