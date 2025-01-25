import { useForm } from "react-hook-form";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from "react";
import logo from "../../../assets/images/socialLogin/logo2.png";
// import QRCode from "react-qr-code";
const QrCreation = () => {
  const [qrData, setQrData] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch, // Use watch to track the form values
  } = useForm();

  // Watch for changes in the form
  const team = watch("team");
  const member = watch("member");
  const freeText = watch("freeText");

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  // Update QR data dynamically based on form values
  const updateQrData = () => {
    const data = {
      team,
      member,
      freeText,
    };

    // Create a string representation of the selected values and set it as QR data
    setQrData(JSON.stringify(data));
  };

  return (
    <div className="max-w-4xl  p-6">
      <h2 className="font-semibold text-[27px] text-[#73879C]">QR作成</h2>
      <div className="bg-white mt-6 rounded-xl pb-8 shadow-md">
        <h4 className="font-semibold text-lg text-gray-500 pt-6 pl-8 pb-5 border-b border-gray-300">
          店舗（チーム）・メンバー別のQRチラシを作成
        </h4>
        <div className="flex justify-between px-8">
          <form onSubmit={handleSubmit(onSubmit)} className=" ">
            {/* Team (店舗) Selection */}
            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                チーム（店舗）の選択
              </label>
              <div className="relative">
                <BiSolidDownArrow className="absolute top-2/3  ml-4 transform -translate-y-1/2 pointer-events-none text-[#3BC2EE]" />
                <select
                  {...register("team", { required: "チームの選択は必須です" })}
                  className="w-full mt-[9px] rounded-[8px] py-[6px] pl-10 pr-12 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm appearance-none"
                  onChange={updateQrData} // Call updateQrData on change
                >
                  <option value="">選択</option>
                  <option value="team1">チーム1</option>
                  <option value="team2">チーム2</option>
                  <option value="team3">チーム3</option>
                </select>
                {errors.team && (
                  <p className="absolute text-red-500 text-xs mt-1 bottom-[-18px] left-0">
                    {errors.team.message}
                  </p>
                )}
              </div>
            </div>

            {/* Member (メンバー) Selection */}
            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                メンバーの選択
              </label>
              <div className="relative">
                <BiSolidDownArrow className="absolute top-2/3 ml-4 transform -translate-y-1/2 pointer-events-none text-[#3BC2EE]" />
                <select
                  {...register("member", {
                    required: "メンバーの選択は必須です",
                  })}
                  className="w-full mt-[9px] rounded-[8px] py-[6px] pl-10 pr-12 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm appearance-none"
                  onChange={updateQrData} // Call updateQrData on change
                >
                  <option value="">選択</option>
                  <option value="member1">メンバー1</option>
                  <option value="member2">メンバー2</option>
                  <option value="member3">メンバー3</option>
                </select>
                {errors.member && (
                  <p className="absolute text-red-500 text-xs mt-1 bottom-[-18px] left-0">
                    {errors.member.message}
                  </p>
                )}
              </div>
            </div>

            {/* Free Text */}
            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                フリーテキスト
              </label>
              <textarea
                {...register("freeText")}
                placeholder="フリーテキストを入力"
                className="mt-[9px] rounded-[8px] py-2 px-2 w-[255px] h-[215px] border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
                onChange={updateQrData} // Call updateQrData on change
              />
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-[#49BBDF] text-white w-[207px] py-1 px-6 rounded-md  focus:outline-none"
              >
                設定
              </button>
            </div>
          </form>

          <div className="border w-[435px] h-[574px] mt-11">
            <div className="my-[26px] mx-[29px] flex">
              <p className="font-bold text-sm">チラシ</p>
              <div>
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <div>{qrData}</div>
            {/* QR Code Display */}
            {/* {qrData ? (
              <QRCode
                value={qrData}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            ) : (
              <p>No QR code data available</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCreation;
