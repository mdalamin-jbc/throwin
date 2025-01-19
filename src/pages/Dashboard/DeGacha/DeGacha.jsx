import { MdKeyboardArrowDown } from "react-icons/md";
import img from "../../../assets/images/dashboard/Oval 7.png";
const DeGacha = () => {
  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
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
                {/* row 1 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <img src={img} alt="" className="w-[29px] rounded-full" />
                    <p className="text-[#49BBDF]">居酒屋ABC_大阪店</p>
                  </td>
                  <td>有り</td>
                  <td>1/4枚</td>
                  <td>5/8枚</td>
                  <td>100/120枚</td>
                </tr>
                {/* row 2 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <img src={img} alt="" className="w-[29px] rounded-full" />
                    <p className="text-[#49BBDF]">居酒屋ABC_大阪店</p>
                  </td>
                  <td>有り</td>
                  <td>1/4枚</td>
                  <td>5/8枚</td>
                  <td>100/120枚</td>
                </tr>
                {/* row 3 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <img src={img} alt="" className="w-[29px] rounded-full" />
                    <p className="text-[#49BBDF]">居酒屋ABC_大阪店</p>
                  </td>
                  <td>有り</td>
                  <td>1/4枚</td>
                  <td>5/8枚</td>
                  <td>100/120枚</td>
                </tr>
              </tbody>
            </table>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeGacha;
