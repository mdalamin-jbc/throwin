import { useForm } from "react-hook-form";
import { BiSolidDownArrow } from "react-icons/bi";
import logo from "../../../assets/images/socialLogin/logo2.png";
import QRCode from "react-qr-code";
import ButtonPrimary from "../../../components/ButtonPrimary";
import html2canvas from "html2canvas";

const QrCreation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const team = watch("team");
  const member = watch("member");
  const freeText = watch("freeText");

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDownload = () => {
    const element = document.getElementById("downloadContent"); // Capture the section you want to download

    // Check and replace any 'oklch' color with rgb or hex
    const styles = getComputedStyle(element);
    if (styles.backgroundColor.includes("oklch")) {
      // Replace 'oklch' with a supported RGB color
      element.style.backgroundColor = "rgb(100, 150, 200)"; // Fallback RGB color
    }

    html2canvas(element, {
      backgroundColor: "#ffffff", // Set a solid fallback background color
      logging: false, // Disable logging
      foreignObjectRendering: true, // Ensure correct rendering of foreign objects (SVGs, etc.)
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr_flyer.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing content for download:", error);
      });
  };

  return (
    <div className="max-w-4xl p-6">
      <h2 className="font-semibold text-[27px] text-[#73879C]">QR作成</h2>
      <div className="flex ">
        <div className="bg-white mt-6 rounded-xl pb-8 shadow-md min-w-[450px] px-6">
          <h4 className="font-semibold text-lg text-[#73879C] pt-6 pb-5 border-b border-gray-300">
            店舗（チーム）・メンバー別のQR付チラシを作成
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Team (店舗) Selection */}
            <div className="mt-6">
              <label className="block font-bold text-sm text-[#434343]">
                チーム（店舗）の選択
              </label>
              <div className="relative">
                <BiSolidDownArrow className="absolute top-2/3 ml-4 transform -translate-y-1/2 pointer-events-none text-[#3BC2EE]" />
                <select
                  {...register("team", { required: "チームの選択は必須です" })}
                  className="w-full mt-[9px] rounded py-[6px] pl-10 pr-12 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm appearance-none"
                >
                  <option value="">選択</option>
                  <option value="チーム1">チーム1</option>
                  <option value="チーム2">チーム2</option>
                  <option value="チーム3">チーム3</option>
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
                  className="w-full mt-[9px] rounded py-[6px] pl-10 pr-12 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm appearance-none"
                >
                  <option value="">選択</option>
                  <option value="メンバー1">メンバー1</option>
                  <option value="メンバー2">メンバー2</option>
                  <option value="メンバー3">メンバー3</option>
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
                className="w-full mt-[9px] rounded py-2 px-2 h-[215px] border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
              />
            </div>

            <div className="mt-8  flex justify-center">
              <button type="submit">
                <ButtonPrimary
                  btnText={"設定"}
                  style={"bg-[#49BBDF] text-white rounded-full "}
                />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Download Section */}
        <div
          className="bg-white mt-6 pb-8 shadow-md min-w-[435px] mx-10"
          id="downloadContent"
        >
          <div className="my-[26px] mx-[29px] ">
            <p className="font-bold text-sm">チラシ</p>
            <div className="mt-12 flex justify-center">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <div className="flex justify-center">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "125px", width: "135px" }}
              value={JSON.stringify({ team, member, freeText })}
              viewBox={`0 0 256 256`}
            />
          </div>

          <div className="text-center mt-9 text-[#454545]">
            <h5 className="font-normal text-xl text-[#454545]">{team}</h5>
            <h5 className="font-semibold text-[33px] text-[#454545] ">
              {member}
            </h5>
            <p className="font-normal text-sm mt-14">
              応援よろしくお願いします！
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <button onClick={handleDownload}>
              <ButtonPrimary
                btnText={"ダウンロードする"}
                style={"bg-[#49BBDF] text-white rounded-full "}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCreation;
