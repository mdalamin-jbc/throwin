import { MdKeyboardArrowDown } from "react-icons/md";
const DeHistory = () => {
  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          Throwin履歴
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
                      日付 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      店舗（チーム）名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      金額 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      メンバー名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <p>2024/12/10</p>
                  </td>
                  <td>
                    <p className="text-[#49BBDF]">居酒屋ABC_大阪店</p>
                  </td>
                  <td>
                    <p>10,000円</p>
                  </td>
                  <td>
                    <p className="text-[#49BBDF]">詳細</p>
                  </td>
                  <td>
                    <p className="bg-[#49BBDF] text-white rounded-full text-center py-1">
                      かりん
                    </p>
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <p>2024/12/10</p>
                  </td>
                  <td>
                    <p className="text-[#49BBDF]">居酒屋ABC_大阪店</p>
                  </td>
                  <td>
                    <p>10,000円</p>
                  </td>
                  <td>
                    <p className="text-[#49BBDF]">詳細</p>
                  </td>
                  <td>
                    <p className="bg-[#49BBDF] text-white rounded-full text-center py-1">
                      かりん
                    </p>
                  </td>
                </tr>
                {/* row 3 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <p>2024/12/10</p>
                  </td>
                  <td>
                    <p className="text-[#49BBDF]">居酒屋ABC_大阪店</p>
                  </td>
                  <td>
                    <p>10,000円</p>
                  </td>
                  <td>
                    <p className="text-[#49BBDF]">詳細</p>
                  </td>
                  <td>
                    <p className="bg-[#49BBDF] text-white rounded-full text-center py-1">
                      かりん
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div className="flex justify-center items-center h-[calc(100vh-128px)]">
              <p className="text-[#B5B5B5]">
                現在登録されている店舗（チーム）はありません
              </p>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default DeHistory;
