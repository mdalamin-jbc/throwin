import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
} from "chart.js";

import TeamChart from "./TeamChart";
import MemberChart from "./MemberChart";
import ClientChart_sa from "./ClientChart_sa";
import StoreTeamChart_sa from "./StoreTeamChart_sa";
import MemberChart_sa from "./MemberChart_sa";
import SalesAgentChart_admin from "./FcGlowAdimnChart/SalesAgentChart_admin";
import ClientChart_admin from "./FcGlowAdimnChart/ClientChart_admin";
import StoreTeamChart_admin from "./FcGlowAdimnChart/StoreTeamChart_admin";
import MemberChart_admin from "./FcGlowAdimnChart/MemberChart_admin";
import useAnalytics from "../../../hooks/useAnalytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
);

const SalesManagement = () => {
  const userRole = "restaurant_owner"; // Replace with actual localStorage call when needed
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1

  const [selectedYear, setSelectedYear] = useState(`${currentYear}年`);
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonth}月`);

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
    console.log("Component mounted, applying default year filter");
    updateFilters({
      year: currentYear,
      // No month filter on initial load - filter by year only
    });
  }, []); // Empty dependency array means this runs once on mount

  // Define role-specific tab configurations
  const tabConfigurations = {
    restaurant_owner: [
      { id: "overall", label: "全体の数字" },
      { id: "team", label: "チーム（店舗）" },
      { id: "member", label: "メンバー" },
    ],
    sales_agent: [
      { id: "whole", label: "全体" },
      { id: "client", label: "クライアント" },
      { id: "store_team", label: "店舗（チーム）" },
      { id: "member", label: "メンバー" },
    ],
    fc_admin: [
      { id: "whole", label: "全体" },
      { id: "sales_agent", label: "営業代理店" },
      { id: "client", label: "クライアント" },
      { id: "store_team", label: "店舗（チーム）" },
      { id: "member", label: "メンバー" },
    ],
    glow_admin: [
      { id: "whole", label: "全体" },
      { id: "sales_agent", label: "営業代理店" },
      { id: "client", label: "クライアント" },
      { id: "store_team", label: "店舗（チーム）" },
      { id: "member", label: "メンバー" },
    ],
  };

  const availableTabs = tabConfigurations[userRole] || [];
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || "overall");

  const chartOptions = {
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

  const handlePeriodChange = () => {
    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    updateFilters({
      year: year,
      month: month,
    });
  };

  // Generate year options (current year + 10 years back)
  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 10; i++) {
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

    console.log("Year changed, auto updating filters:", { year, month });
    updateFilters({ year, month });
  };

  // Handle month change and auto-update
  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);

    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(newMonth.replace("月", ""));

    console.log("Month changed, auto updating filters:", { year, month });
    updateFilters({ year, month });
  };

  // Common period selector component
  const PeriodSelector = () => (
    <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
      <label className="text-[#434343]">期間指定</label>
      <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border rounded px-2 py-1"
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
          className="border rounded px-2 py-1"
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
      <button className="bg-[#4DBAEF] py-[6px] px-4 rounded-md text-white">
        支払い通知書ダウンロード
      </button>
    </div>
  );

  // Stats cards component
  const StatsCards = ({ stats }) => (
    <div className="mt-[33px] grid grid-cols-3 gap-[17px]">
      {stats.map((item, i) => (
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
  );

  // Role-specific content renderers
  const renderRestaurantOwnerContent = () => {
    switch (activeTab) {
      case "overall":
        const chartData = generateChartData();

        return (
          <>
            <PeriodSelector />
            <StatsCards
              stats={[
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
                  title: "Throwin回数",
                  value: data ? formatCurrency(data.total_throwins) : "0",
                  unit: "回",
                },
                {
                  title: "稼働店舗（チーム）数",
                  value: data ? data.total_stores.toString() : "0",
                  unit: "",
                },
              ]}
            />
            {chartData && (
              <div className="mt-[27px]">
                <Bar
                  height={200}
                  width={600}
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            )}
          </>
        );
      case "team":
        return <TeamChart />;
      case "member":
        return <MemberChart />;
      default:
        return null;
    }
  };

  const renderSalesAgentContent = () => {
    switch (activeTab) {
      case "whole":
        const chartData = generateChartData();

        return (
          <>
            <PeriodSelector />
            <StatsCards
              stats={[
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
              ]}
            />
            {chartData && (
              <div className="mt-[27px]">
                <Bar
                  height={200}
                  width={600}
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            )}
          </>
        );
      case "client":
        return <ClientChart_sa />;
      case "store_team":
        return <StoreTeamChart_sa />;
      case "member":
        return <MemberChart_sa />;
      default:
        return null;
    }
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case "whole":
        const chartData = generateChartData();

        return (
          <>
            <PeriodSelector />
            <StatsCards
              stats={[
                {
                  title: "合計売上",
                  value: data ? formatCurrency(data.total_amount_jpy) : "0",
                  unit: "円",
                },
                {
                  title: "稼働クライアント数",
                  value: data ? data.total_stores.toString() : "0",
                  unit: "",
                },
                {
                  title: "glow利益",
                  value: data
                    ? formatCurrency(Math.floor(data.total_amount_jpy * 0.1))
                    : "0",
                  unit: "円",
                },
                {
                  title: "Free Company 利益",
                  value: data
                    ? formatCurrency(Math.floor(data.total_amount_jpy * 0.1))
                    : "0",
                  unit: "円",
                },
                {
                  title: "クライアント 利益",
                  value: data
                    ? formatCurrency(Math.floor(data.total_amount_jpy * 0.8))
                    : "0",
                  unit: "円",
                },
              ]}
            />
            {chartData && (
              <div className="mt-[27px]">
                <Bar
                  height={200}
                  width={600}
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            )}
          </>
        );
      case "sales_agent":
        return <SalesAgentChart_admin />;
      case "client":
        return <ClientChart_admin />;
      case "store_team":
        return <StoreTeamChart_admin />;
      case "member":
        return <MemberChart_admin />;
      default:
        return null;
    }
  };

  // Main render function based on user role
  const renderContent = () => {
    if (loading && !data) {
      return (
        <div className="flex justify-center items-center p-8">Loading...</div>
      );
    }

    switch (userRole) {
      case "restaurant_owner":
        return renderRestaurantOwnerContent();
      case "sales_agent":
        return renderSalesAgentContent();
      case "fc_admin":
      case "glow_admin":
        return renderAdminContent();
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">売上管理</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 ">
        <div className="flex">
          {availableTabs.map((tab) => (
            <h4
              key={tab.id}
              className={`font-semibold text-[18px] pt-[30px] pl-[33px] pb-[21px] cursor-pointer ${
                activeTab === tab.id ? "text-[#73879C]" : "text-[#DFDFDF]"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </h4>
          ))}
        </div>
        <div className="border-b-[3px] mx-5"></div>
        <div className="mx-[33px]">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SalesManagement;
