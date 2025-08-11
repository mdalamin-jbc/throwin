import { useState } from "react";
import { Bar } from "react-chartjs-2";
import useAnalytics from "../../../hooks/useAnalytics";

const MemberChart = () => {
  const [selectedYear, setSelectedYear] = useState("2025年");
  const [selectedMonth, setSelectedMonth] = useState("1月");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const {
    data,
    loading,
    generateChartData,
    formatCurrency,
    updateFilters,
    filters,
  } = useAnalytics();

  const handlePeriodChange = () => {
    const year = selectedYear.replace("年", "");
    const month = selectedMonth.replace("月", "");

    updateFilters({
      year: parseInt(year),
      month: parseInt(month),
      team: selectedTeam,
      member: selectedMember,
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

  // Mock data - replace with actual API data
  const teams = [
    { id: "1", name: "BBT 福井" },
    { id: "2", name: "BBT 東京" },
    { id: "3", name: "BBT 大阪" },
  ];

  const members = [
    { id: "1", name: "山田　花梨（かりん）", teamId: "1" },
    { id: "2", name: "佐藤　太郎", teamId: "1" },
    { id: "3", name: "田中　花子", teamId: "2" },
  ];

  // Filter members based on selected team
  const filteredMembers = selectedTeam
    ? members.filter((member) => member.teamId === selectedTeam)
    : members;

  return (
    <div>
      {/* Period Selection */}
      <div className="mt-[22px] flex items-center gap-4 font-semibold text-xs">
        <label className="text-[#434343] mr-9">期間指定</label>
        <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded px-2 py-1 w-[134px]"
          >
            {[...Array(21)].map((_, i) => (
              <option key={i}>{new Date().getFullYear() - i}年</option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded px-2 py-1 w-[111px]"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i}>{i + 1}月</option>
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
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              setSelectedMember(""); // Reset member selection when team changes
            }}
            className="border rounded px-2 py-1 w-[295px]"
          >
            <option value="">全て</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Member Selection */}
      <div className="mt-[px] flex items-center gap-[50px] font-semibold text-xs">
        <label className="text-[#434343]">メンバー</label>
        <div className="flex items-center gap-2 py-[5px] px-2 rounded-md">
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="border rounded px-2 py-1 w-[295px]"
            disabled={!selectedTeam && filteredMembers.length === 0}
          >
            <option value="">全て</option>
            {filteredMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
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

export default MemberChart;
