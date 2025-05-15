import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import search from "../../../assets/icons/search_3.png";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseGetOrganizations from "../../../hooks/Dashboard/UseGetOrganizations";
import { Circles } from "react-loader-spinner";
import _ from "lodash";

const Client = () => {
  const { organizations, isLoading } = UseGetOrganizations();
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const searchValue = watch("searchMember");

  // Memoized debounced search function
  const debouncedSearch = useMemo(() => {
    return _.debounce((searchTerm, data) => {
      if (!searchTerm || searchTerm.trim() === "") {
        setFilteredOrganizations(data);
        return;
      }

      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      const results = data.filter(
        (store) =>
          // Search in multiple fields for more robust searching
          store.name?.toLowerCase().includes(normalizedSearchTerm) ||
          store.post_code?.toLowerCase().includes(normalizedSearchTerm) ||
          store.exposure?.toLowerCase().includes(normalizedSearchTerm)
      );

      setFilteredOrganizations(results);
    }, 300); // 300ms debounce
  }, []);

  // Effect to handle search when input changes
  useEffect(() => {
    if (organizations) {
      debouncedSearch(searchValue, organizations);
    }

    return () => {
      // Cancel debounced function on cleanup
      debouncedSearch.cancel();
    };
  }, [searchValue, organizations, debouncedSearch]);

  // Initialize filtered organizations when organizations data is loaded
  useEffect(() => {
    if (organizations) {
      setFilteredOrganizations(organizations);
    }
  }, [organizations]);

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

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">営業代理店</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
          営業代理店リスト
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="mt-[22px] flex justify-between">
            <Link
              to="creat_new"
              className="bg-[#49BBDF] text-white py-[6px] px-[36px] rounded flex items-center gap-3"
            >
              <p>新規作成</p> <FaPlus />
            </Link>
            <div className="relative flex flex-col justify-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  className="w-5 h-5 opacity-70"
                  src={search}
                  alt="search icon"
                />
              </div>
              <input
                {...register("searchMember")}
                name="searchMember"
                type="text"
                placeholder="検索"
                className="w-full rounded-[8px] py-[6px] pl-9 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
                aria-label="検索"
              />
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-[#EEEEEE] text-[#434343] font-semibold">
                <tr className="border-b">
                  <th className="text-left p-4">
                    <button className="flex items-center">
                      営業代理店名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="text-left p-4">
                    <button className="flex items-center">
                      ステータス <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="text-left p-4">
                    <button className="flex items-center">
                      代理店コード <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="text-right p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map((store) => (
                    <tr key={store.uid} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-[#49BBDF]">
                        <Link
                          to={`details/${store.uid}`}
                          onClick={() =>
                            localStorage.setItem("store", JSON.stringify(store))
                          }
                        >
                          {store.name}
                        </Link>
                      </td>
                      <td className="p-4">
                        {store.exposure === "パスワード未設定" ? (
                          <span>{store.exposure}</span>
                        ) : (
                          <span>パスワード設定済</span>
                        )}
                      </td>
                      <td className="p-4">{store.post_code}</td>
                      <td className="p-4 text-right">
                        <Link
                          to={`edit/${store.uid}`}
                          className="bg-[#49BBDF] text-white py-1 px-5 rounded-full text-sm"
                        >
                          編集
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-[#B5B5B5] py-4">
                      {searchValue
                        ? "検索結果が見つかりません"
                        : "現在登録されている代理店はありません"}
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

export default Client;
