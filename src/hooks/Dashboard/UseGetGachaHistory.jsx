import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";

const UseGetGachaHistory = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: resturentGachaHisotry = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gacha_history_resturent_woner"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        const response = await AxiosPrivate.get(
          "/restaurant-owner/gacha-history"
        );
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching restaurant owner gacha history :",
          error.response?.data || error.message
        );
        throw new Error(
          "Failed to restaurant owner gahca history. Please try again."
        );
      }
    },
    enabled: Boolean(user?.access),
  });
  return { resturentGachaHisotry, refetch, isLoading, isError, error };
};

export default UseGetGachaHistory;
