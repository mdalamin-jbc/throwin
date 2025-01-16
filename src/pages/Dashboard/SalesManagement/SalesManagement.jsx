import { useState } from "react";
// import Datepicker from "react-tailwindcss-datepicker";
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

// Register Chart.js components
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
  const START_FROM = new Date();
  START_FROM.setMonth(START_FROM.getMonth() + 1);

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleClick = () => {
    console.log("Selected Date Range:", value);
  };

  // Chart Data
  const data = {
    labels: [
      "1 火",
      "2 水",
      "3 木",
      "4 金",
      "5 土",
      "6 日",
      "7 月",
      "8 火",
      "9 水",
      "10 木",
      "11 木",
      "12 木",
      "13 木",
      "14 木",
    ],
    datasets: [
        {
            type: "line",
            label: "客数",
            borderColor: "#9E9E9E",
            borderWidth: 2,
            pointRadius: 4,
            fill: false,
            data: [3, 4, 5, 2.5, 0, 4, 5, 4, 3, 0],
            yAxisID: "y1",
          },
      {
        type: "bar",
        label: "売上",
        backgroundColor: "#49BBDF",
        data: [10, 12, 15, 8, 0, 14, 18, 13, 9, 0],
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
          drawOnChartArea: false, // Prevent overlap of grid lines
        },
      },
    },
  };

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">売上管理</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px] ">
        <div className="flex">
          <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
            全体の数字
          </h4>
          <h4 className="font-semibold text-[18px] text-[#DFDFDF] pt-[30px] pl-[33px] pb-[21px]">
            チーム（店舗）
          </h4>
          <h4 className="font-semibold text-[18px] text-[#DFDFDF] pt-[30px] pl-[33px] pb-[21px]">
            メンバー
          </h4>
        </div>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="mt-[22px] flex items-center gap-6 font-semibold text-xs">
            <label className="text-[#434343]">期間指定</label>
            <div className="w-[265px] border py-[5px] pl-2 rounded-[7px] flex items-center gap-1">
              {/* <Datepicker
                startFrom={START_FROM}
                useRange={false}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                popperPlacement="bottom"
                inputClassName="bg-transparent border-none focus:outline-none"
              /> */}
            </div>
            <button
              className="bg-[#49BBDF] py-[5.5px] px-[18.5px] rounded-md text-white"
              onClick={handleClick}
            >
              集計
            </button>
          </div>

          {/* Metrics Cards */}
          <div className="mt-[33px] grid grid-cols-3 gap-[17px]">
            <div className="bg-[#F9F9F9] py-[47px] text-center rounded-[20px]">
              <p className="font-light text-base">売上</p>
              <div className="flex justify-center items-center gap-6">
                <h3 className="text-[#49BBDF] font-semibold text-[36px] mt-[28px] ml-10">
                  1,000,000
                </h3>
                <p className="font-semibold mt-10">円</p>
              </div>
            </div>
            <div className="bg-[#F9F9F9] py-[47px] text-center rounded-[20px]">
              <p className="font-light text-base">Throwin回数</p>
              <div className="flex justify-center items-center gap-6">
                <h3 className="text-[#49BBDF] font-semibold text-[36px] mt-[28px] ml-10">
                  1,500
                </h3>
                <p className="font-semibold mt-10">回</p>
              </div>
            </div>
            <div className="bg-[#F9F9F9] py-[47px] text-center rounded-[20px]">
              <p className="font-light text-base">稼働店舗（チーム）数</p>
              <div className="flex justify-center items-center gap-6">
                <h3 className="text-[#49BBDF] font-semibold text-[36px] mt-[28px] ">
                  5
                </h3>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-[27px]">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;
