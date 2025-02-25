
import useAxiosPrivate from '../axiousPrivate';
import { useAuth } from '../useAuth';
import { useQuery } from '@tanstack/react-query';

const UseGetSalesAgents = () => {
    const axiosPrivate = useAxiosPrivate();
    axiosPrivate;
    const { user } = useAuth();
  
    const {
      refetch,
      data: salesAgents = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["sales-agents"],
      queryFn: async () => {
        if (!user?.access) return [];
  
        try {
          const response = await axiosPrivate.get(`/admins/sales-agents`);
  
          return response.data.results || [];
        } catch (error) {
          console.error(
            "Error fetching sales-agents",
            error.response?.data || error.message
          );
          throw new Error("Failed to fetch sales-agents Please try again.");
        }
      },
      enabled: Boolean(user?.access),
    });
  
  
    return { salesAgents, refetch, isLoading, isError, error };
};

export default UseGetSalesAgents;