import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import useAxiosPrivate from "../axiousPrivate";

const UseGetResturentWonerSettings = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: resturentWonerSettings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment_history_resturent_woner"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        const response = await AxiosPrivate.get("/restaurant-owner/settings");
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching restaurant owner settings  :",
          error.response?.data || error.message
        );
        throw new Error(
          "Failed to restaurant owner payment settings. Please try again."
        );
      }
    },
    enabled: Boolean(user?.access),
  });
  return { resturentWonerSettings, refetch, isLoading, isError, error };
};

export default UseGetResturentWonerSettings;
