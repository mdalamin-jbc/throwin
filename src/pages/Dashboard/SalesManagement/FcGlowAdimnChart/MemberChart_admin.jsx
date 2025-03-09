import React from "react";
import { Bar } from "react-chartjs-2";

const MemberChart_admin = () => {
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
      ClientChart_admin
      <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343] mr-9">期間指定</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select
            // value={selectedYear}
            // onChange={handleYearChange}
            className="border rounded px-2 py-1 w-[134px]"
          >
            {[...Array(21)].map((_, i) => (
              <option key={i}>{new Date().getFullYear() - i}年</option>
            ))}
          </select>

          <select
            // value={selectedMonth}
            // onChange={handleMonthChange}
            className="border rounded px-2 py-1 w-[111px]"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i}>{i + 1}月</option>
            ))}
          </select>
        </div>

        <button className="bg-[#49BBDF] py-[6px] px-4 rounded-md text-white">
          集計
        </button>
      </div>
      {/* ------------------------------- */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">営業代理店　　</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select className="border rounded px-2 py-1 w-[295px]">
            <option value="">株式会社セールスラボ</option>
          </select>
        </div>
      </div>
      {/* ------------------------------- */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">クライアント　</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select className="border rounded px-2 py-1 w-[295px]">
            <option value="">居酒屋ABC</option>
          </select>
        </div>
      </div>
      {/* ------------------------------- */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">店舗(チーム)　</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select className="border rounded px-2 py-1 w-[295px]">
            <option value="">居酒屋ABC_大阪店</option>
          </select>
        </div>
      </div>
      {/* ------------------------------- */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">メンバー　　　</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select className="border rounded px-2 py-1 w-[295px]">
            <option value="">かりん</option>
          </select>
        </div>
      </div>
      <div className="mt-[33px] grid grid-cols-3 gap-[17px]">
        {[
          {
            title: "売上額(Throwin額)",
            value: "1,000,000",
            unit: "円",
          },
          { title: "利益額", value: "3000,000", unit: "円" },
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
      <div className="mt-[27px]">
        <Bar height={200} width={600} data={dataOverall} options={options} />
      </div>
    </div>
  );
};

export default MemberChart_admin;
