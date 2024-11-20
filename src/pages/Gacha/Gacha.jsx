import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import throw_wh from "../../assets/images/home/logo.png";
import { GoDotFill } from "react-icons/go";
const Gacha = () => {
  return (
    <div className="mb-[120px] ">
      <div>
        <TitleBar title="お気に入り"></TitleBar>
      </div>
      <div className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5">
        <div className="flex items-center">
          <div className="w-[49px] h-[49px] bg-[#49BBDF] rounded-full flex items-center justify-center">
            <img className="w-[50px]" src={throw_wh} alt="" />
          </div>

          <div className="flex-1 flex justify-between ">
            <div className="ml-[13px] grid gap-1">
              <h3 className="font-bold text-sm">Throwin公式</h3>
              <p className="font-normal text-sm ">
                【お知らせ】機能改善を行いました
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[#9C9C9C] text-[11.5px]">04:04</p>
              <h3 className="font-bold text-sm ">
                <GoDotFill className="text-[#5B8AE4] text-[20px] "></GoDotFill>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[49px] h-[49px] bg-[#49BBDF] rounded-full flex items-center justify-center">
            <img className="w-[50px]" src={throw_wh} alt="" />
          </div>

          <div className="flex-1 flex justify-between ">
            <div className="ml-[13px] grid gap-1">
              <h3 className="font-bold text-sm">Throwin公式</h3>
              <p className="font-normal text-sm ">
                【お知らせ】機能改善を行いました
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[#9C9C9C] text-[11.5px]">04:04</p>
              <h3 className="font-bold text-sm ">
                <GoDotFill className="text-[#5B8AE4] text-[20px] "></GoDotFill>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[49px] h-[49px] bg-[#49BBDF] rounded-full flex items-center justify-center">
            <img className="w-[50px]" src={throw_wh} alt="" />
          </div>

          <div className="flex-1 flex justify-between ">
            <div className="ml-[13px] grid gap-1">
              <h3 className="font-bold text-sm">Throwin公式</h3>
              <p className="font-normal text-sm ">
                【お知らせ】機能改善を行いました
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[#9C9C9C] text-[11.5px]">04:04</p>
              <h3 className="font-bold text-sm ">
                <GoDotFill className="text-[#D9D9D9] text-[20px] "></GoDotFill>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gacha;
