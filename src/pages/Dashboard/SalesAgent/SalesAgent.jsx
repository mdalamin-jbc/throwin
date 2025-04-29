import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import search from "../../../assets/icons/search_3.png";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import UseGetSalesAgents from "../../../hooks/Dashboard/UseGetSalesAgents";
import { Circles } from "react-loader-spinner";

const SalesAgent = () => {
  const { salesAgents, isLoading, isError, error } = UseGetSalesAgents();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const searchValue = watch("searchMember");
  console.log("Search Input:", searchValue);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        データの取得中にエラーが発生しました: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">営業代理店</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          営業代理店アカウント新規登録
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="mt-[22px] flex justify-between ">
            <Link
              to="sign_up"
              className="bg-[#49BBDF] text-white py-[6px] px-[36px] rounded flex items-center gap-3"
            >
              <p>新規登録</p> <FaPlus />
            </Link>
            <div className="relative flex flex-col justify-center mr-[100px]">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
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
                type="text"
                placeholder="検索"
                className="w-full rounded-[8px] py-[6px] pl-9 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
              />
              {errors.searchMember && (
                <span className="text-red-500 mt-1">
                  {errors.searchMember.message}
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="table">
              <thead className="bg-[#EEEEEE] text-[#434343] font-semibold">
                <tr>
                  <th>
                    <button className="flex items-center">
                      クライアント名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th>
                    <button className="flex items-center">
                      ステータス <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th>
                    <button className="flex items-center">
                      代理店コード <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {salesAgents.length > 0 ? (
                  salesAgents
                    .filter((store) =>
                      store.name
                        .toLowerCase()
                        .includes(searchValue?.toLowerCase() || "")
                    )
                    .map((store) => (
                      <tr
                        key={store.uid}
                        className="hover border cursor-pointer"
                        onClick={() => {
                          localStorage.setItem("store", JSON.stringify(store));
                          // Example: navigate to details page
                          // navigate(`/dashboard/sales-agent/${store.code}`);
                        }}
                      >
                        <td className="flex items-center gap-[17px]">
                          <p>{store.name}</p>
                        </td>
                        <td>{store.code}</td>
                        <td>
                          <button className="bg-[#ABABAB] rounded-full px-3 py-1 text-white">
                            {store.agency_code}
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-[#B5B5B5] py-4">
                      現在登録されている店舗（チーム）はありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAgent;
