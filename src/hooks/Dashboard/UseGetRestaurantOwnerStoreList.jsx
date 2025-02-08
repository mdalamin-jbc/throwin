import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetRestaurantOwnerStoreList = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: storeList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant_owner_store_list"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        const response = await AxiosPrivate.get("/restaurant-owner/stores");
        return response.data.results;
      } catch (error) {
        console.error(
          "Error fetching restaurant owner store list:",
          error.response?.data || error.message
        );
        throw new Error("Failed to fetch store list. Please try again.");
      }
    },
    enabled: Boolean(user?.access),
  });
  return { storeList, refetch, isLoading, isError, error };
};

export default UseGetRestaurantOwnerStoreList;
