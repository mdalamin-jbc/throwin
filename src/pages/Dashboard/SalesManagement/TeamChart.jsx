import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import useAnalytics from "../../../hooks/useAnalytics";
import UseGetRestaurantOwnerStoreList from "../../../hooks/Dashboard/UseGetRestaurantOwnerStoreList";

const TeamChart = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(`${currentYear}年`);
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonth}月`);
  const [selectedTeam, setSelectedTeam] = useState("");

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
    console.log("TeamChart mounted, applying default year filter");
    updateFilters({
      year: currentYear,
      team: selectedTeam,
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
      team: selectedTeam,
    });
    updateFilters({ year, month, team: selectedTeam });
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
      team: selectedTeam,
    });
    updateFilters({ year, month, team: selectedTeam });
  };

  // Handle team change and auto-update
  const handleTeamChange = (e) => {
    const newTeam = e.target.value;
    setSelectedTeam(newTeam);

    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    updateFilters({ year, month, store_uid: newTeam });
  };

  const handlePeriodChange = () => {
    const year = parseInt(selectedYear.replace("年", ""));
    const month = parseInt(selectedMonth.replace("月", ""));

    updateFilters({
      year: year,
      month: month,
      team: selectedTeam,
    });
  };

  const chartData = generateChartData();

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

  const { storeList } = UseGetRestaurantOwnerStoreList();
  const teams = storeList.map(({ uid, name }) => ({ uid, name }));

  // Mock team data - replace with actual API data
  // const teams = [
  //   { id: "1", name: "BBT 福井" },
  //   { id: "2", name: "BBT 東京" },
  //   { id: "3", name: "BBT 大阪" },
  // ];

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

      {/* Team Selection */}
      <div className="mt-[px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343]">チーム（店舗）</label>
        <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
          <select
            value={selectedTeam}
            onChange={handleTeamChange}
            className="border rounded px-2 py-1 w-[295px]"
          >
            <option value="">全て</option>
            {teams.map((team) => (
              <option key={team.uid} value={team.uid}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-[33px] grid grid-cols-4 gap-[17px]">
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
            title: "Throwin回数",
            value: data ? formatCurrency(data.total_throwins) : "0",
            unit: "回",
          },
          {
            title: "稼働店舗（チーム）数",
            value: data ? data.total_stores.toString() : "0",
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
      {chartData ? (
        <div className="mt-[27px]">
          <Bar height={200} width={600} data={chartData} options={options} />
        </div>
      ) : (
        <div className="mt-[27px] flex justify-center items-center p-8">
          {loading ? "Loading..." : "No data available"}
        </div>
      )}
    </div>
  );
};

export default TeamChart;
