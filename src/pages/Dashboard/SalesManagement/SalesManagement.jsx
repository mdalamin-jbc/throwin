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
} from "chart.js";
import TeamChart from "./TeamChart";
import MemberChart from "./MemberChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesManagement = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const [selectedYear, setSelectedYear] = useState("2025年");
  const [selectedMonth, setSelectedMonth] = useState("1月");

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const dataOverall = {
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

  const dataTeam = {
    labels: ["チームA", "チームB", "チームC", "チームD", "チームE"],
    datasets: [
      {
        type: "bar",
        label: "売上",
        backgroundColor: "#49BBDF",
        data: [500, 750, 600, 900, 850],
        yAxisID: "y",
      },
    ],
  };

  const dataMember = {
    labels: ["メンバー1", "メンバー2", "メンバー3", "メンバー4", "メンバー5"],
    datasets: [
      {
        type: "bar",
        label: "売上",
        backgroundColor: "#49BBDF",
        data: [100, 200, 150, 180, 250],
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

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">売上管理</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <div className="flex">
          {[
            { id: "overall", label: "全体の数字" },
            { id: "team", label: "チーム（店舗）" },
            { id: "member", label: "メンバー" },
          ].map((tab) => (
            <h4
              key={tab.id}
              className={`font-semibold text-[18px] pt-[30px] pl-[33px] pb-[21px] cursor-pointer ${
                activeTab === tab.id ? "text-[#73879C]" : "text-[#DFDFDF]"
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </h4>
          ))}
        </div>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          {/* Overall Tab Content */}
          {activeTab === "overall" && (
            <>
              <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
                <label className="text-[#434343]">期間指定</label>
                <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(21)].map((_, i) => (
                      <option key={i}>{new Date().getFullYear() - i}年</option>
                    ))}
                  </select>

                  <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
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
              <div className="mt-[33px] grid grid-cols-3 gap-[17px]">
                {[
                  {
                    title: "売上額(Throwin額)",
                    value: "1,000,000",
                    unit: "円",
                  },
                  { title: "利益額", value: "15,00", unit: "" },
                  { title: "Throwin回数", value: "1,500", unit: "回" },
                  { title: "稼働店舗（チーム）数", value: "5", unit: "" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#F9F9F9] py-[47px] text-center rounded-[20px]"
                  >
                    <p className="font-semibold text-lg text-[利益額]">
                      {item.title}
                    </p>
                    <div className="flex justify-center items-center gap-6">
                      <h3 className="text-[#49BBDF] font-semibold text-[36px] mt-[28px] ml-10">
                        {item.value}
                      </h3>
                      {item.unit && (
                        <p className="font-semibold mt-10">{item.unit}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-[27px]">
                <Bar
                  height={200}
                  width={600}
                  data={dataOverall}
                  options={options}
                />
              </div>
            </>
          )}

          {/* Team Tab Content */}
          {activeTab === "team" && (
            <div className="mt-[27px]">
              <TeamChart />
            </div>
          )}

          {/* Member Tab Content */}
          {activeTab === "member" && (
            <div className="mt-[27px]">
              <MemberChart />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;
