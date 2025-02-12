import { useState } from "react";
import img from "../../../assets/images/dashboard/phone.png";
import navmenu from "../../../assets/images/dashboard/prevideo_img_navmenu.png";
import staff from "../../../assets/images/store&staff/image.png";
import logo from "../../../assets/logo/logo4.png";
import TitleBar from "../../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";

const StaffPreviewSection = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedAmount, setSelectedAmount] = useState("0");
  const amounts = ["1,000", "3,000", "5,000", "10,000"];
  const handleClick = (amount) => {
    setSelectedAmount(amount);
    // console.log(`Selected Amount: ${amount}`);
  };

  return (
    <div className="w-[340px] mx-auto  ">
      {/* Tabs Section */}
      <div className="flex w-full max-w-md bg-white rounded-lg shadow-md mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 p-3 text-center rounded-l-lg font-semibold ${
            activeTab === "profile"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          プロフィール
        </button>
        <button
          onClick={() => setActiveTab("thanks")}
          className={`flex-1 p-3 text-center rounded-r-lg font-semibold ${
            activeTab === "thanks"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          サンクスページ
        </button>
      </div>

      {/* Profile Section */}
      {activeTab === "profile" && (
        <div className="relative w-[300px] h-[600px] flex flex-col items-center justify-start mx-auto ">
          <img src={img} alt="iPhone mockup" className="w-full h-full" />
          <div className="absolute top-10 w-[272.5px]  mr-[2px]">
            <TitleBar
              style="mb-0 w-full     rounded-t-lg "
              back={<RiArrowLeftSLine className="text-white text-2xl" />}
              title=""
              icon={<img className="w-[80px]" src={logo} alt="logo" />}
            />
            <div>
              {/* this is staff name */}
              <h2 className="font-bold text-[18px] text-[#585858] text-center mt-1">
                かりん
              </h2>
              {/* fun fact */}
              <h2 className="font-bold text-[8px] text-[#585858] text-center mb-2">
                旬菜鮮魚と旨い酒 わらび
              </h2>
              <div className="relative w-full  mr-2">
                <img
                  src={
                    staff?.image
                      ? staff.image?.large
                      : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                  }
                  alt={`${staff?.name || "Default"} image`}
                  className="object-cover w-full h-[200px] "
                />

                <div className="absolute bottom-0 left-0 w-full px-3 mb-[22px] p-2 text-white rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <div className="bg-white text-[#F06464] flex items-center gap-1 px-2 py-1 rounded-full shadow-md text-xs">
                      0<IoMdStar />
                      {staff?.score}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {staff?.name} かりん
                    </h3>

                    <div>
                      <FaHeart className="text-xl font-bold text-red-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#80D0E91A] pt-2 pb-[14px] px-[12px] w-full max-w-[430px]">
                <h2 className="font-semibold text-lg mb-2">自己紹介</h2>
                <p className="font-light text-sm">
                  {staff?.introduction}
                  こんにちは、かりんです！店長を始めて3年目です。お客様の笑顔をみ
                </p>
              </div>
              {/* ------------ */}

              <div className="px-3">
                <div className="flex justify-between items-center  mt-[5px] border-b-2 pb-2 text-[#C0C0C0]">
                  <h4 className="font-semibold text-sm">金額</h4>

                  <div className="font-semibold text-[16px] text-[#C0C0C0]">
                    <input
                      type="text"
                      value={selectedAmount}
                      // onChange={handleAmountChange}
                      className="text-right mr-1 bg-transparent max-w-[200px] focus:outline-none w-fit placeholder:text-[16px] placeholder:font-normal"
                    />
                    円
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-[14px] overflow-x-auto scrollbar-hide font-semibold text-sm text-[#49BBDF]">
                  {amounts.map((amount, index) => (
                    <h4
                      key={index}
                      onClick={() => handleClick(amount)}
                      className={`border rounded-lg mt-[22px] px-4 py-2 whitespace-nowrap cursor-pointer 
                      `}
                    >
                      {amount}円
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iPhone Mockup */}
      {activeTab === "thanks" && (
        <div className="relative w-[300px] h-[600px] flex flex-col items-center justify-start mx-auto ">
          <img src={img} alt="iPhone mockup" className="w-full h-full" />
          <div className="absolute top-10 w-[272.5px]  mr-[2px]">
            <TitleBar
              style="mb-0 w-full     rounded-t-lg "
              back={<RiArrowLeftSLine className="text-white text-2xl" />}
              title=""
              icon={<img className="w-[80px]" src={logo} alt="logo" />}
            />
            <h3 className="text-center mt-10 font-bold text-xl mb-3">かりん</h3>
            <div className="flex justify-center">
              <img
                className="w-[120px] h-[120px] rounded-full "
                src="https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                alt=""
              />
            </div>
            <div className="text-center">
              <p className="w-[70%] mx-auto font-semibold mt-5 ">
                ありがとうございます！ スローインしました
              </p>
              <p className="text-[#5297FF] mt-1 font-bold text-xs">
                履歴を見る
              </p>
            </div>
            <div className="mt-[110px]">
              
              <div className="">
                <img className="rounded-b-[40px]" src={navmenu} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPreviewSection;
