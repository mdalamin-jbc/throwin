import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./axiousPrivate";
import { useAuth } from "./useAuth";

const UseGetPaymentHistory = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  // Use the Object form for useQuery as required by React Query v5
  const { refetch, data = [], isLoading, isError } = useQuery({
    queryKey: ["paymentHistory"], // Use the query key as an array or string
    queryFn: async () => {
      try {
        const res = await AxiosPrivate.get("payment_service/payments");
        return res.data; // Return payment history data
      } catch (error) {
        console.error("Error fetching payment history:", error.response?.data || error.message);
        throw error; // Throw the error so React Query can handle it
      }
    },
    enabled: Boolean(user?.access), // Only run the query if the user has access
  });

  return { paymentHistory: data, refetch, isLoading, isError }; // Return query data and states
};

export default UseGetPaymentHistory;
