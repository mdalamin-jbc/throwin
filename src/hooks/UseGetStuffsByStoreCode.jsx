import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./axiosPublic";

const useGetStuffsByStoreCode = (store_code) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data = { results: [] }, // Default to an object with an empty array for results
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stuffs", store_code],
    queryFn: async () => {
      const res = await axiosPublic.get(`stores/${store_code}/staff/list`);
      return res.data;
    },
    enabled: !!store_code, // Only run the query if storeCode is provided
  });

  // Access the results array directly from data
  const store = data.results;

  return { store, refetch, isLoading, isError };
};

export default useGetStuffsByStoreCode;
