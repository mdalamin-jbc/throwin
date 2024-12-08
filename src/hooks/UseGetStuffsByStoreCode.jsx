import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./axiosPublic";

const useGetStuffsByStoreCode = (storeData) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data = { results: [] }, // Default to an object with an empty array for results
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stuffs", storeData?.code],
    queryFn: async () => {
      const res = await axiosPublic.get(`stores/${storeData.code}/staff/list`);
      return res.data;
    },
    enabled: !!storeData?.code, // Only run the query if storeCode is provided
  });

  // Access the results array directly from data
  const stuffs = data.results;

  return { stuffs, refetch, isLoading, isError };
};

export default useGetStuffsByStoreCode;
