import { useState } from "react";
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
import ClientChart from "./ClientChart_sa";
import ClientChart_sa from "./ClientChart_sa";

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
  const userRole = localStorage.getItem("userRole");
  const [selectedYear, setSelectedYear] = useState("2025年");
  const [selectedMonth, setSelectedMonth] = useState("1月");

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

  // Get available tabs based on user role
  const availableTabs = tabConfigurations[userRole] || [];
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || "overall");

  // Common chart data
  const chartData = {
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

  // Common period selector component
  const PeriodSelector = () => (
    <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
      <label className="text-[#434343]">期間指定</label>
      <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {[...Array(21)].map((_, i) => (
            <option key={i}>{new Date().getFullYear() - i}年</option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i}>{i + 1}月</option>
          ))}
        </select>
      </div>
      <button className="bg-[#49BBDF] py-[6px] px-4 rounded-md text-white">
        集計
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
        return (
          <>
            <PeriodSelector />
            <StatsCards
              stats={[
                { title: "売上額(Throwin額)", value: "1,000,000", unit: "円" },
                { title: "利益額", value: "15,00", unit: "" },
                { title: "Throwin回数", value: "1,500", unit: "回" },
                { title: "稼働店舗（チーム）数", value: "5", unit: "" },
              ]}
            />
            <div className="mt-[27px]">
              <Bar
                height={200}
                width={600}
                data={chartData}
                options={chartOptions}
              />
            </div>
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
        return (
          <>
            <PeriodSelector />
            <StatsCards
              stats={[
                { title: "総売上", value: "2,500,000", unit: "円" },
                { title: "総クライアント数", value: "25", unit: "" },
                { title: "アクティブクライアント", value: "20", unit: "" },
              ]}
            />
            <div className="mt-[27px]">
              <Bar
                height={200}
                width={600}
                data={chartData}
                options={chartOptions}
              />
            </div>
          </>
        );
      case "client":
        return <ClientChart_sa />;
      case "store_team":
      case "member":
        return <MemberChart />;
      default:
        return null;
    }
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case "whole":
        return (
          <>
            <PeriodSelector />
            <StatsCards
              stats={[
                { title: "総売上", value: "5,000,000", unit: "円" },
                { title: "営業代理店数", value: "30", unit: "" },
                { title: "総クライアント数", value: "150", unit: "" },
                { title: "アクティブ率", value: "85", unit: "%" },
              ]}
            />
            <div className="mt-[27px]">
              <Bar
                height={200}
                width={600}
                data={chartData}
                options={chartOptions}
              />
            </div>
          </>
        );
      case "sales_agent":
      case "client":
      case "store_team":
      case "member":
        return <MemberChart />;
      default:
        return null;
    }
  };

  // Main render function based on user role
  const renderContent = () => {
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
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
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
