import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../axiousPrivate";
import { useAuth } from "../../useAuth";


const UseGetAdminSettings = () => {
    const AxiosPrivate = useAxiosPrivate();
    const { user } = useAuth();
  
    const {
      refetch,
      data: AdminSettings = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["get-admin-seetings"],
      queryFn: async () => {
        if (!user?.access) return [];
  
        try {
          const response = await AxiosPrivate.get("/admins/settings");
          console.log(response);
          return response.data;
        } catch (error) {
          console.error(
            "Error fetching admin settings  :",
            error.response?.data || error.message
          );
          throw new Error(
            "Failed to admin payment settings. Please try again."
          );
        }
      },
      enabled: Boolean(user?.access),
    });
    return { AdminSettings, refetch, isLoading, isError, error };
  };

export default UseGetAdminSettings;