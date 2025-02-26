
import useAxiosPrivate from '../axiousPrivate';
import { useAuth } from '../useAuth';
import { useQuery } from '@tanstack/react-query';

const UseGetOrganizations = () => {
    const axiosPrivate = useAxiosPrivate();
    axiosPrivate;
    const { user } = useAuth();
  
    const {
      refetch,
      data: organizations = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["organizations"],
      queryFn: async () => {
        if (!user?.access) return [];
  
        try {
          const response = await axiosPrivate.get(`/admins/organizations`);
  
          return response.data.results || [];
        } catch (error) {
          console.error(
            "Error fetching organizations",
            error.response?.data || error.message
          );
          throw new Error("Failed to fetch organizations Please try again.");
        }
      },
      enabled: Boolean(user?.access),
    });
  
  
    return { organizations, refetch, isLoading, isError, error };
};

export default UseGetOrganizations;