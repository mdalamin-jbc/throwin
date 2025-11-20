import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import useAnalytics from "../../../hooks/useAnalytics";

const StoreTeamChart = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(`${currentYear}年`);
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonth}月`);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  // Initialize useAnalytics with current year only (no month filter initially)
  const {
    data,
    loading,
    generateChartData,
    formatCurrency,
    updateFilters,
    filters,
  } = useAnalytics({
    year: currentYear,
    // No month on initial load - filter by year only
  });

  // Auto-filter on component mount with default year only
  useEffect(() => {
    console.log("StoreTeamChart mounted, applying default year filter");
    updateFilters({
      year: currentYear,
      client: selectedClient,
      store: selectedStore,
      // No month filter on initial load - filter by year only
    });
  }, []); // Empty dependency array means this runs once on mount

  // Generate year options (current year + 20 years back)
  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 20; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Handle year change and auto-update
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);

    const year = parseInt(newYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    console.log("Year changed, auto updating filters:", {
      year,
      month,
      client: selectedClient,
      store: selectedStore,
    });
    updateFilters({
      year,
      month,
      client: selectedClient,
      store: selectedStore,
    });
  };

  // Handle month change and auto-update
  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);

    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(newMonth.replace("月", ""));

    console.log("Month changed, auto updating filters:", {
      year,
      month,
      client: selectedClient,
      store: selectedStore,
    });
    updateFilters({
      year,
      month,
      client: selectedClient,
      store: selectedStore,
    });
  };

  // Handle client change and auto-update
  const handleClientChange = (e) => {
    const newClient = e.target.value;
    setSelectedClient(newClient);

    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    console.log("Client changed, auto updating filters:", {
      year,
      month,
      client: newClient,
      store: selectedStore,
    });
    updateFilters({ year, month, client: newClient, store: selectedStore });
  };

  // Handle store change and auto-update
  const handleStoreChange = (e) => {
    const newStore = e.target.value;
    setSelectedStore(newStore);

    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    console.log("Store changed, auto updating filters:", {
      year,
      month,
      client: selectedClient,
      store: newStore,
    });
    updateFilters({ year, month, client: selectedClient, store: newStore });
  };

  const handlePeriodChange = () => {
    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    updateFilters({
      year: year,
      month: month,
      client: selectedClient,
      store: selectedStore,
    });
  };

  // Use dynamic data or fallback to static data
  const chartData = generateChartData() || {
    labels: [
      "1 火",
      "2 水",
      "3 木",
      "4 金",
      "5 土",
      "6 日",
      "7 月",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "18",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
    ],
    datasets: [
      {
        type: "line",
        label: "客数",
        borderColor: "#9E9E9E",
        borderWidth: 2,
        pointRadius: 4,
        fill: false,
        data: [
          2.1, 2.5, 3.6, 2, 0, 0, 2.4, 2.9, 2, 2.5, 0, 0, 2.6, 2.8, 1.7, 2, 1.8,
          0, 0, 2.5, 2.9, 0, 0, 2.7, 2.2, 0, 3.7,
        ],
        yAxisID: "y1",
      },
      {
        type: "bar",
        label: "売上",
        backgroundColor: "#49BBDF",
        data: [
          12, 14.5, 17.5, 11, 0, 0, 14, 17, 11, 13, 0, 0, 15, 16.2, 9, 12, 10.5,
          0, 0, 15, 17, 0, 0, 15.5, 13, 0, 21,
        ],
        yAxisID: "y",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Mock data - replace with actual API data
  const clients = [
    { id: "1", name: "居酒屋ABC" },
    { id: "2", name: "レストランXYZ" },
  ];

  const stores = [
    { id: "1", name: "居酒屋ABC_大阪店" },
    { id: "2", name: "居酒屋ABC_東京店" },
  ];

  return (
    <div>
      {/* Period Selection */}
      <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343] mr-9">期間指定</label>
        <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border rounded px-2 py-1 w-[134px]"
          >
            {generateYearOptions().map((year) => (
              <option key={year} value={`${year}年`}>
                {year}年
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded px-2 py-1 w-[111px]"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}月`}>
                {i + 1}月
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handlePeriodChange}
          className="bg-[#49BBDF] py-[6px] px-4 rounded-md text-white"
          disabled={loading}
        >
          {loading ? "読み込み中..." : "集計"}
        </button>
      </div>

      {/* Client Selection */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">クライアント　</label>
        <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
          <select
            value={selectedClient}
            onChange={handleClientChange}
            className="border rounded px-2 py-1 w-[295px]"
          >
            <option value="">全て</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Store Selection */}
      <div className="flex items-center gap-[32px] font-semibold text-xs">
        <label className="text-[#434343]">店舗(チーム)</label>
        <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
          <select
            value={selectedStore}
            onChange={handleStoreChange}
            className="border rounded px-2 py-1 w-[295px]"
          >
            <option value="">全て</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-[33px] grid grid-cols-3 gap-[17px]">
        {[
          {
            title: "売上（Throwin額)",
            value: data ? formatCurrency(data.total_amount_jpy) : "1,000,000",
            unit: "円",
          },
          {
            title: "利益額",
            value: data ? formatCurrency(data.latest_balance_jpy) : "300,000",
            unit: "円",
          },
          {
            title: "稼働メンバー数",
            value: data ? data.total_stores?.toString() : "5",
            unit: "",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#F9F9F9] py-[47px] text-center rounded-[20px]"
          >
            <p className="font-semibold text-lg">{item.title}</p>
            <div className="flex justify-center items-center gap-6">
              <h3 className="text-[#49BBDF] font-semibold text-[36px] mt-[28px] ml-10">
                {item.value}
              </h3>
              {item.unit && <p className="font-semibold mt-10">{item.unit}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-[27px]">
        {loading ? (
          <div className="flex justify-center items-center p-8">Loading...</div>
        ) : (
          <Bar height={200} width={600} data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default StoreTeamChart;
