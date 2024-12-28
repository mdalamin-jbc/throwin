import { useQuery } from "@tanstack/react-query";

import { useAuth } from "./useAuth";
import useAxiosPrivate from "./axiousPrivate";

const UseGetPaymentHistory = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    refetch,
    data: paymentHistory = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.access],
    queryFn: async () => {
      try {
        const response = await AxiosPrivate.get("/payment_service/payments");
        console.log("Payment History Response:", response.data); // Debugging log
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching payment history:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    enabled: Boolean(user?.access),
  });

  return { paymentHistory, refetch, isLoading, isError, error };
};

export default UseGetPaymentHistory;
