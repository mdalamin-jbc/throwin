const TeamChart = () => {
  return (
    <div>
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
        <label className="text-[#434343]">チーム（店舗）</label>
        <div className="flex items-center gap-2  py-[5px] px-2 rounded-md">
          <select className="border rounded px-2 py-1 w-[295px]">
            <option value="">BBT 福井</option>
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
          { title: "利益額", value: "15,00", unit: "" },
          { title: "Throwin回数", value: "1,500", unit: "回" },
          { title: "稼働店舗（チーム）数", value: "5", unit: "" },
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
    </div>
  );
};

export default TeamChart;
