import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./axiosPublic";

const UseGetStoreDetailsByStoreCode = (store_code) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data = { results: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["store_details_by_store_code", store_code],
    queryFn: async () => {
      const res = await axiosPublic.get(`/stores/${store_code}`);
      return res.data;
    },
    enabled: !!store_code,
  });

  const storeDetails = data;

  return { storeDetails, refetch, isLoading, isError };
};

export default UseGetStoreDetailsByStoreCode;
