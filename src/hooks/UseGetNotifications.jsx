import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosPrivate from "./axiousPrivate";

const UseGetNotifications = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await AxiosPrivate.get("notifications");
        return res.data;
      } catch (error) {
        console.error(
          "Error fetching notifications:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    enabled: Boolean(user?.access),
  });

  const notifications = data;

  return { notifications, refetch, isLoading, isError };
};

export default UseGetNotifications;
