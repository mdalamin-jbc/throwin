import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";

const PaymentManagement = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  
  useEffect(() => {
    // Get current year
    const currentYear = new Date().getFullYear();
    
    // Generate years array (current year and 10 years back)
    const yearsArray = [];
    for (let i = 0; i <= 10; i++) {
      yearsArray.push(currentYear - i);
    }
    
    setYears(yearsArray);
    setSelectedYear(currentYear);
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">支払い管理</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          支払い履歴
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="flex items-center mt-5">
            <h4 className="mr-8 font-semibold text-[#434343]">期間指定</h4>
            <div>
              <select
                className="font-semibold text-[#73879C] border-2 py-[6px] px-4 rounded"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>
              <select
                className="font-semibold text-[#73879C] border-2 py-[6px] px-4 rounded mx-4"
                name=""
                id=""
              >
                <option value="5">5月</option>
                <option value="8">8月</option>
                <option value="10">10月</option>
                <option value="12">12月</option>
              </select>
            </div>
            <button className="py-2 px-6 bg-[#49BBDF] rounded text-white">
              確定
            </button>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="table ">
              {/* head */}
              <thead className=" bg-[#EEEEEE] text-[#434343] ">
                <tr>
                  <th>
                    <button className="flex items-center ">
                      クライアント名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      ステータス <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      金額（税別） <MdKeyboardArrowDown />
                    </button>
                  </th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover border">
                  <td>
                    <p className="text-[#49BBDF]">株式会社フリーカンパニー</p>
                  </td>
                  <td>
                    <p>支払い済み</p>
                  </td>
                  <td>
                    <p>10,000円</p>
                  </td>

                  <td>
                    <p className="bg-[#49BBDF] text-white rounded-full text-center py-1">
                    詳細
                    </p>
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="hover border">
                  <td>
                    <p className="text-[#49BBDF]">株式会社フリーカンパニー</p>
                  </td>
                  <td>
                    <p>支払い済み</p>
                  </td>
                  <td>
                    <p>10,000円</p>
                  </td>

                  <td>
                    <p className="bg-[#49BBDF] text-white rounded-full text-center py-1">
                    詳細
                    </p>
                  </td>
                </tr>
                {/* row 3 */}
                <tr className="hover border">
                  <td>
                    <p className="text-[#49BBDF]">株式会社フリーカンパニー</p>
                  </td>
                  <td>
                    <p>支払い済み</p>
                  </td>
                  <td>
                    <p>10,000円</p>
                  </td>

                  <td>
                    <p className="bg-[#49BBDF] text-white rounded-full text-center py-1">
                    詳細
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

export default PaymentManagement;