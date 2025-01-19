import useAxiosPublic from "./axiosPublic";
import { useQuery } from "@tanstack/react-query";

const UseGetUserReview = (userUID) => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: userReview = [] } = useQuery({
    queryKey: ["userReview", userUID],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `payment_service/staff/${userUID}/recent-messages/`
      );
      return res.data;
    },
    enabled: !!userUID, // Ensure userUID is truthy
  });

  return { userReview, refetch };
};

export default UseGetUserReview;
