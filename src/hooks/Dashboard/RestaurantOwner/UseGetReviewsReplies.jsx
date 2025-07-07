import useAxiosPrivate from "../../axiousPrivate";
import { useQuery } from "@tanstack/react-query";

const UseGetReviewsReplies = ({ activeReviewUid }) => {
  const axiousPrivate = useAxiosPrivate();

  const {
    refetch,
    data: replies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant_owner_replies", activeReviewUid],
    queryFn: async () => {
      if (!activeReviewUid) return [];
      try {
        const response = await axiousPrivate.get(
          `/restaurant-owner/reviews/${activeReviewUid}/replies`
        );
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching restaurant owner replies",
          error.response?.data || error.message
        );
        throw new Error("Failed to fetch replies. Please try again.");
      }
    },
    enabled: Boolean(activeReviewUid),
  });

  return { replies, refetch, isLoading, isError, error };
};

export default UseGetReviewsReplies;
