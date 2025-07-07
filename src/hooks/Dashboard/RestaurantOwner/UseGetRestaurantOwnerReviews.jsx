import useAxiosPrivate from "../../axiousPrivate";
import { useAuth } from "../../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetRestaurantOwnerReviews = () => {
  const axiousPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const {
    refetch,
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant_owner_review"],
    queryFn: async () => {
      if (!user?.access) return [];
      try {
        const response = await axiousPrivate.get("/restaurant-owner/reviews");
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching restaurant owner review",
          error.response?.data || error.message
        );
        throw new Error("Failed to fetch review. Please try again.");
      }
    },
    enabled: Boolean(user?.access),
  });
  return { reviews, refetch, isLoading, isError, error };
};

export default UseGetRestaurantOwnerReviews;
