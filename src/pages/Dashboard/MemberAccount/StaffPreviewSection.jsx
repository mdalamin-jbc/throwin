import { useState } from "react";
import img from "../../../assets/images/dashboard/phone.png";
import staff from "../../../assets/images/store&staff/image.png";
import logo from "../../../assets/logo/logo4.png";
import TitleBar from "../../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoMdStar } from "react-icons/io";

const StaffPreviewSection = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
        <div className="relative w-[300px] h-[600px] flex flex-col items-center justify-start mx-auto">
          <img src={img} alt="iPhone mockup" className="w-full h-full" />
          <div className="absolute top-10 w-[271px]  ">
            <TitleBar
              style="mb-0 w-full     rounded-t-lg "
              back={<RiArrowLeftSLine className="text-white text-2xl" />}
              title=""
              icon={<img className="w-[80px]" src={logo} alt="logo" />}
            />
            <div>
              {/* this is staff name */}
              <h2 className="font-bold text-[27px] text-[#585858] text-center">
                かりん
              </h2>
              {/* fun fact */}
              <h2 className="font-bold text-[10px] text-[#585858] text-center">
                旬菜鮮魚と旨い酒 わらび
              </h2>
              <div className="relative w-full max-w-[430px]">
                <img
                  src={
                    staff?.image
                      ? staff.image?.large
                      : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                  }
                  alt={`${staff?.name || "Default"} image`}
                  className="object-cover w-full h-[277px]"
                />

                <div className="absolute bottom-0 left-0 w-full px-6 mb-[22px] p-2 text-white rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <div className="bg-white text-[#F06464] flex items-center gap-1 px-2 py-1 rounded-full shadow-md">
                      0<IoMdStar />
                      {staff?.score}
                    </div>
                    <h3 className="text-2xl font-bold">{staff?.name}</h3>
                    {/* <div
                      className={`text-2xl font-bold cursor-pointer ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={!isProcessing ? handleHeartToggle : undefined}
                    >
                      {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                    </div> */}
                    <div>
                      {/* <FaRegHeart /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#80D0E91A] pt-5 pb-[17px] px-[26px] w-full max-w-[430px]">
                <h2 className="font-semibold text-lg mb-2">自己紹介</h2>
                <p className="font-light text-sm">{staff?.introduction}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iPhone Mockup */}
      {activeTab === "thanks" && (
        <div>
          <img src={img} alt="iPhone mockup" className="w-full max-w-xs" />
        </div>
      )}
    </div>
  );
};

export default StaffPreviewSection;
