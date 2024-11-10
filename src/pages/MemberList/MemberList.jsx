import { useState } from "react";
import search from "../../assets/icons/search2.png";
import logo from "../../assets/images/home/logo.png";
import team from "../../assets/images/team/team.png";
import team1 from "../../assets/images/team/team.png";
import team2 from "../../assets/images/team/team.png";
import team3 from "../../assets/images/team/team.png";
import team4 from "../../assets/images/team/team.png";
import team5 from "../../assets/images/team/team.png";
import team6 from "../../assets/images/team/team.png";
import team7 from "../../assets/images/team/team.png";
import team8 from "../../assets/images/team/team.png";
import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";

const MemberList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log(value);
  };

  // Array of team images
  const teamMembers = [
    { image: team, title: "旬菜鮮魚と旨い酒 わらび" },
    { image: team1, title: "バスケチームA" },
    { image: team2, title: "野球チームB" },
    { image: team3, title: "BAR abc" },
    { image: team4, title: "福井バスケ" },
    { image: team5, title: "大阪バスケ" },
    { image: team6, title: "野球チームB" },
    { image: team7, title: "旬菜鮮魚と旨い酒 わらび" },
    { image: team8, title: "バスケチームA" },
  ];

  return (
    <div className="mb-28">
      <div>
        <TitleBar
          style=""
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo " />
          }
        ></TitleBar>
      </div>
      <div className="flex flex-col justify-center">
        <form className="flex flex-col w-[342px] mx-auto">
          <div className="relative flex items-center w-full">
            <input
              {...register("name", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "無効なメール形式です",
                },
              })}
              name="name"
              type="text"
              placeholder="店舗コードを入力"
              className="w-full rounded-[8px] py-3 pl-4 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <img
                className="w-5 h-5 opacity-70"
                src={search}
                alt="search icon"
              />
            </div>
          </div>
          {errors.name && (
            <span className="text-red-500 mt-1">{errors.name.message}</span>
          )}
        </form>
      </div>
      <h2 className="flex justify-end font-normal text-xs w-[342px] m-[14px] mx-auto">
        チーム・店舗の一覧({teamMembers.length})
      </h2>

      {/* Team Images */}
      <div className="grid grid-cols-2 gap-3 w-[342px] mx-auto ">
        {teamMembers.map((member, index) => (
          <div key={index} className="relative w-[170px] h-[170px]">
            <img
              src={member.image}
              alt={member.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-2 left-2  py-1  rounded-b-lg">
              <p className="text-white font-boldtext-sm">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
