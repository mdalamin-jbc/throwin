import { useState, useEffect } from "react";
import useAxiosPrivate from "./axiousPrivate";

const useAnalytics = (initialFilters = {}) => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    year: null,
    month: null,
    store_uid: null,
    staff_uid: null,
    date_from: null,
    date_to: null,
    ...initialFilters,
  });

  const fetchAnalytics = async (queryFilters = filters) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      Object.entries(queryFilters).forEach(([key, value]) => {
        if (value !== null && value !== "" && value !== undefined) {
          params.append(key, value.toString());
        }
      });

      // Debug log to see the final URL parameters
      const finalUrl = `/payment_service/analytics/stats/?${params.toString()}`;

      const response = await axiosPrivate.get(finalUrl);

      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Always fetch on mount, even without filters
    fetchAnalytics(initialFilters);
  }, []); // Empty dependency array to run only once on mount

  const updateFilters = (newFilters) => {
    console.log("Updating filters from:", filters, "to:", newFilters); // Debug log

    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchAnalytics(updatedFilters);
  };

  const generateChartData = () => {
    if (!data?.timeseries) return null;

    const sortedData = [...data.timeseries].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const labels = sortedData.map((item) => {
      const date = new Date(item.date);
      const day = date.getDate();
      const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][
        date.getDay()
      ];
      return `${day} ${dayOfWeek}`;
    });

    const throwins = sortedData.map((item) => item.throwin_count);
    const amounts = sortedData.map((item) => item.total_amount / 1000); // Convert to thousands

    return {
      labels,
      datasets: [
        {
          type: "line",
          label: "客数",
          borderColor: "#9E9E9E",
          borderWidth: 2,
          pointRadius: 4,
          fill: false,
          data: throwins,
          yAxisID: "y1",
        },
        {
          type: "bar",
          label: "売上",
          backgroundColor: "#49BBDF",
          data: amounts,
          yAxisID: "y",
        },
      ],
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ja-JP").format(amount);
  };

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    generateChartData,
    formatCurrency,
    refetch: () => fetchAnalytics(),
  };
};

export default useAnalytics;
