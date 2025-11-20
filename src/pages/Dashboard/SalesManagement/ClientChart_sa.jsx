import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import useAnalytics from "../../../hooks/useAnalytics";

const ClientChart_sa = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedClient, setSelectedClient] = useState("");

  const { data, loading, generateChartData, formatCurrency, updateFilters } =
    useAnalytics();

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

  const handleSearch = () => {
    updateFilters({
      year: parseInt(selectedYear),
      month: parseInt(selectedMonth),
      // Add client filtering logic when available in API
    });
  };

  const chartData = generateChartData();

  return (
    <div>
      <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343] mr-9">期間指定</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded px-2 py-1 w-[134px]"
          >
            {[...Array(21)].map((_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}年
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded px-2 py-1 w-[111px]"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}月
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#49BBDF] py-[6px] px-4 rounded-md text-white"
          disabled={loading}
        >
          {loading ? "読み込み中..." : "集計"}
        </button>
      </div>

      {/* Sales Agent Selector */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">営業代理店　　</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select className="border rounded px-2 py-1 w-[295px]">
            <option value="">株式会社セールスラボ</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-[33px] grid grid-cols-3 gap-[17px]">
        {[
          {
            title: "売上額(Throwin額)",
            value: data ? formatCurrency(data.total_amount_jpy) : "0",
            unit: "円",
          },
          {
            title: "利益額",
            value: data ? formatCurrency(data.latest_balance_jpy) : "0",
            unit: "円",
          },
          {
            title: "稼働メンバー数",
            value: data ? data.total_stores.toString() : "0",
            unit: "",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#F9F9F9] py-[47px] text-center rounded-[20px]"
          >
            <p className="font-semibold text-lg text-[利益額]">{item.title}</p>
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
      {chartData ? (
        <div className="mt-[27px]">
          <Bar height={200} width={600} data={chartData} options={options} />
        </div>
      ) : (
        <div className="mt-[27px] flex justify-center items-center h-48">
          <p className="text-gray-500">データがありません</p>
        </div>
      )}
    </div>
  );
};

export default ClientChart_sa;
