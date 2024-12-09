import { useState } from "react";
import search from "../../assets/icons/search2.png";
import logo from "../../assets/images/home/logo.png";
import team from "../../assets/images/team/team.png";
import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import { Link, useParams } from "react-router-dom";
import UseGetStaffListByStaffName from "../../hooks/UseGetStaffListByStaffName";
import { Circles } from "react-loader-spinner";
import { IoMdStar } from "react-icons/io";

const MemberList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { staffName } = useParams();
  const { staffs, isLoading } = UseGetStaffListByStaffName(staffName);
  const staffmembers = staffs.results;
  console.log(staffmembers);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="mb-28">
      <div>
        <TitleBar
          style=""
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo " />
          }
          title="" // Pass the required title prop
        />
      </div>
      <div className="flex flex-col justify-center mt-4">
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
        チーム・店舗の一覧({staffmembers.length})
      </h2>

      {/* Team Images */}
      <div className="grid grid-cols-2 gap-3 w-[342px] mx-auto ">
        {staffmembers.map((staff, index) => (
          <div key={index} className="relative w-[170px] h-[170px]">
            <Link to={`/staff/${staff.username}`}>
              <div className="relative">
                <img
                  src="https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                  alt={`${staff.username} image`}
                  className="object-cover rounded-lg w-[170px] h-[170px]"
                />
                {/* Rating in the top right corner */}
                <div className="absolute top-[6px] right-[6px] bg-white text-[#49BBDF] flex items-center gap-1 px-2 py-1 rounded-[4px] shadow-md">
                  <IoMdStar />
                  {staff.score}
                </div>
                {/* Name and Type in the bottom left corner */}
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full p-2 text-white rounded-b-lg">
                  <h3 className="text-sm font-semibold">{staff.username}</h3>
                  <p className="text-xs">{staff.introduction}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
