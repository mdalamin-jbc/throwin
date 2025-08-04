import { MdKeyboardArrowDown } from "react-icons/md";
import img from "../../../assets/images/dashboard/Oval 7.png";
import UseGetGachaHistory from "../../../hooks/Dashboard/UseGetGachaHistory";
const DeGacha = () => {
  const { resturentGachaHisotry } = UseGetGachaHistory();

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">ガチャ</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 ">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          ガチャ使用状況
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="overflow-x-auto mt-6">
            <table className="table ">
              {/* head */}
              <thead className=" bg-[#EEEEEE] text-[#434343] ">
                <tr>
                  <th>
                    <button className="flex items-center ">
                      店舗（チーム）名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      ガチャ券付与設定 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th>金チケ使用状況</th>
                  <th>銀チケ使用状況</th>
                  <th>銅チケ使用状況</th>
                </tr>
              </thead>
              <tbody>
                {resturentGachaHisotry?.map((item, index) => (
                  <tr key={item.uid} className="hover border">
                    <td className="flex items-center gap-[17px]">
                      <img
                        src={item.banner || img}
                        alt=""
                        className="w-[29px] rounded-full"
                      />
                      <p className="text-[#49BBDF]">{item.name}</p>
                    </td>
                    <td>{item.gacha_settings === "yes" ? "有り" : "無し"}</td>
                    <td>
                      {item.gold_issued}/{item.gold_total || "N/A"}枚
                    </td>
                    <td>
                      {item.silver_issued}/{item.silver_total || "N/A"}枚
                    </td>
                    <td>
                      {item.bronze_issued}/{item.bronze_total || "N/A"}枚
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeGacha;
