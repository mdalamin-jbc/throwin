import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetAvailableSpins = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const { refetch, data, isLoading, isError } = useQuery({
    queryKey: ["availableSpins", user?.access],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/gacha/available-spins`);
      return res.data;
    },
    enabled: !!user?.access,
  });

  return { availableSpins: data?.results || [], refetch, isLoading, isError };
};

export default UseGetAvailableSpins;
