import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import useAxiosPrivate from "../axiousPrivate";

const UseGetResturentWonerSettings = () => {
  const userRole = localStorage.getItem("userRole");
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: resturentWonerSettings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-user-settings"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        let endpoint = "";

        if (userRole === "fc_admin" || userRole === "glow_admin") {
          endpoint = "/admins/settings";
        } else if (
          userRole === "restaurant_owner" ||
          userRole === "sales_agent"
        ) {
          endpoint = "/restaurant-owner/settings";
        } else {
          throw new Error("Invalid user role");
        }

        const response = await AxiosPrivate.get(endpoint);
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching settings:",
          error.response?.data || error.message
        );
        throw new Error(
          "Failed to fetch user settings. Please try again."
        );
      }
    },
    enabled: Boolean(user?.access),
  });

  return { resturentWonerSettings, refetch, isLoading, isError, error };
};

export default UseGetResturentWonerSettings;
