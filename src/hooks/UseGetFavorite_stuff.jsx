import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosPrivate from "./axiousPrivate";

const useGetFavoriteStuff = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favoriteStuff"], // Query key should still be an array or string
    queryFn: async () => {
      try {
        const res = await AxiosPrivate.get("auth/users/favorite-staff");
        return res.data;
      } catch (error) {
        console.error("Error fetching favorite stuff:", error.response?.data || error.message);
        throw error;
      }
    },
    enabled: Boolean(user?.access), // Only run the query if user has access
  });

  const favoriteStuffs = data;

  return { favoriteStuffs, refetch, isLoading, isError };
};

export default useGetFavoriteStuff;
