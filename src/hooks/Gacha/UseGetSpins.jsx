import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetSpins = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    data: tickets, // aliasing `data` as `tickets`
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["availableTickets", user?.access],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/gacha/tickets`);
      return res.data;
    },
    enabled: !!user?.access,
  });

  return { tickets, refetch, isLoading, isError };
};

export default UseGetSpins;