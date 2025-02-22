import React from "react";
import useAxiosPrivate from "../axiousPrivate";
import { useAuth } from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const UseGetAdminClients = () => {
  const axiosPrivate = useAxiosPrivate();
  axiosPrivate;
  const { user } = useAuth();

  const {
    refetch,
    data: adminClients = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fc_or_Glow_admin_clients"],
    queryFn: async () => {
      if (!user?.access) return [];

      try {
        const response = await axiosPrivate.get(`/admins/organizations`);

        return response.data.results || [];
      } catch (error) {
        console.error(
          "Error fetching admin clients:",
          error.response?.data || error.message
        );
        throw new Error("Failed to fetch admin clients Please try again.");
      }
    },
    enabled: Boolean(user?.access),
  });
  console.log(adminClients);

  return { adminClients, refetch, isLoading, isError, error };
};

export default UseGetAdminClients;
