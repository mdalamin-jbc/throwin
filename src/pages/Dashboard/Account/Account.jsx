import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import search from "../../../assets/icons/search_3.png";
import { Link } from "react-router-dom";
import UseGetRestaurantOwnerStoreList from "../../../hooks/Dashboard/UseGetRestaurantOwnerStoreList";
import Pagination from "./Pagination";

const Account = () => {
  const { storeList } = UseGetRestaurantOwnerStoreList();

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const searchQuery = watch("searchMember", "");

  // Calculate pagination
  const filteredStores = storeList.filter(
    (store) =>
      store.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStores = filteredStores.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
          チーム（店舗）リスト
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="mt-[22px] flex justify-between">
            <Link
              to="creat_newStore"
              className="bg-[#4EBDF3] text-white py-[6px] px-[106px] rounded"
            >
              新規作成 <span className="text-xl">+</span>
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
                {...register("searchMember")}
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
              <thead className="bg-[#49BBDF] text-white">
                <tr>
                  <th>
                    <button className="flex items-center">
                      ポジション名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th>
                    <button className="flex items-center">
                      店舗（チーム）コード <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th>
                    <button className="flex items-center">
                      公開状況 <MdKeyboardArrowDown />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedStores.length > 0 ? (
                  paginatedStores.map((store) => (
                    <tr key={store.uid} className="hover border">
                      <Link
                        onClick={() =>
                          localStorage.setItem("store", JSON.stringify(store))
                        }
                        to={`${store.code}`}
                      >
                        <td className="flex items-center gap-[17px]">
                          <img
                            src={
                              store.banner?.small ||
                              "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                            }
                            alt={store.name}
                            className="w-[29px] rounded-full"
                          />
                          <p>{store.name}</p>
                        </td>
                      </Link>
                      <td>{store.code}</td>
                      <td>
                        <button className="bg-[#ABABAB] rounded-full px-3 pb-1 text-white">
                          {store.status}
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

            {/* Add pagination */}
            {paginatedStores.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
