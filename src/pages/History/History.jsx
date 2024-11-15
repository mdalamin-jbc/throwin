import { Helmet } from "react-helmet";
import TitleBar from "../../components/TitleBar";

const History = () => {
  return (
    <div>
      <div>
        <Helmet>
          <title>Throwin | History</title>
        </Helmet>
        <TitleBar style="mb-0 w-full" title="履歴" icon=""></TitleBar>
      </div>
      <div className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5">
        <div className="flex items-center">
          <img
            className="w-[49px] rounded-full"
            src="https://shorturl.at/aBtj9"
            alt=""
          />
          <div className="flex-1 flex justify-between items-center">
            <div className="ml-[13px]">
              <h3 className="font-bold text-sm">かりん　店舗名</h3>
              <p className="font-normal text-sm text-[#9C9C9C]">
                2024/1/24 19:00
              </p>
            </div>
            <div className="flex flex-col items-end">
              
              <h3 className="font-bold text-sm ">5,000円</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-[49px] rounded-full"
            src="https://shorturl.at/aBtj9"
            alt=""
          />
          <div className="flex-1 flex justify-between items-center">
            <div className="ml-[13px]">
              <h3 className="font-bold text-sm">かりん　店舗名</h3>
              <p className="font-normal text-sm text-[#9C9C9C]">
                2024/1/24 19:00
              </p>
            </div>
            <div className="flex flex-col items-end">
              
              <h3 className="font-bold text-sm ">5,000円</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-[49px] rounded-full"
            src="https://shorturl.at/aBtj9"
            alt=""
          />
          <div className="flex-1 flex justify-between items-center">
            <div className="ml-[13px]">
              <h3 className="font-bold text-sm">かりん　店舗名</h3>
              <p className="font-normal text-sm text-[#9C9C9C]">
                2024/1/24 19:00
              </p>
            </div>
            <div className="flex flex-col items-end">
              
              <h3 className="font-bold text-sm ">5,000円</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
