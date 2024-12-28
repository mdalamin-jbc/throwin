import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import search from "../../../assets/icons/search_3.png";
import img from "../../../assets/images/store&staff/image.png";
const Account = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          チーム（店舗）リスト
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="mt-[22px]  flex justify-between ">
            <button className="bg-[#4EBDF3] text-white py-[6px] px-[106px] rounded">
              新規作成
            </button>
            <div className="relative flex flex-col justify-center mr-[100px]">
              <div
                // onClick={handleSearchStuff}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <img
                  className="w-5 h-5 opacity-70"
                  src={search}
                  alt="search icon"
                />
              </div>
              <input
                {...register("searchMember", {
                  required: "メンバー名は必須です",
                })}
                name="searchMember"
                type="text"
                placeholder="検索"
                className="w-full rounded-[8px] py-[6px] pl-9 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
                // value={searchByStuffName}
                // onChange={(e) => setSearchByStuffName(e.target.value)}
              />

              {errors.searchMember && (
                <span className="text-red-500 mt-1">
                  {errors.searchMember.message}
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="table ">
              {/* head */}
              <thead className=" bg-[#49BBDF] text-white ">
                <tr>
                  <th>
                    <button className="flex items-center ">
                      ポジション名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      店舗（チーム）コード <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <img src={img} alt="" className="w-[29px] rounded-full" />
                    <p>かりん</p>
                  </td>
                  <td>公開</td>
                  <td>
                    <span className="bg-[#ABABAB] rounded-full px-3 py-1">
                      詳細
                    </span>
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <img src={img} alt="" className="w-[29px] rounded-full" />
                    <p>かりん</p>
                  </td>
                  <td>公開</td>
                  <td>
                    <span className="bg-[#ABABAB] rounded-full px-3 py-1">
                      詳細
                    </span>
                  </td>
                </tr>
                {/* row 3 */}
                <tr className="hover border">
                  <td className="flex items-center gap-[17px]">
                    <img src={img} alt="" className="w-[29px] rounded-full" />
                    <p>かりん</p>
                  </td>
                  <td>公開</td>
                  <td>
                    <span className="bg-[#ABABAB] rounded-full px-3 py-1">
                      詳細
                    </span>
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

export default Account;
