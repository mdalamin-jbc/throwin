import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetPaymentHistoryResturentWoner = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: PaymentHistoryResturentWoner = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment_history_resturent_woner"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        const response = await AxiosPrivate.get(
          "/payment_service/payment-histories/"
        );
        return response.data.results;
      } catch (error) {
        console.error(
          "Error fetching restaurant owner payment history :",
          error.response?.data || error.message
        );
        throw new Error(
          "Failed to restaurant owner payment history. Please try again."
        );
      }
    },
    enabled: Boolean(user?.access),
  });
  return { PaymentHistoryResturentWoner, refetch, isLoading, isError, error };
};

export default UseGetPaymentHistoryResturentWoner;
