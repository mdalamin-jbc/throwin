import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import search from "../../../assets/icons/search_3.png";
import img from "../../../assets/images/store&staff/image.png";
import { Link } from "react-router-dom";
import UseGetRestaurantOwnerStoreList from "../../../hooks/Dashboard/UseGetRestaurantOwnerStoreList";

const Account = () => {
  const { storeList, refetch, isLoading, isError, error } =
    UseGetRestaurantOwnerStoreList();
  console.log(storeList);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const searchQuery = watch("searchMember", "");

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch or set data dynamically
    const fetchTeams = async () => {
      // Replace with real API call
      const data = [
        { id: 1, name: "かりん", status: "公開" },
        { id: 2, name: "さくら", status: "非公開" },
        { id: 3, name: "たけし", status: "公開" },
      ];
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) => team.name.includes(searchQuery));

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px]">
          チーム（店舗）リスト
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="mt-[22px] flex justify-between">
            <Link
              to="creat_new_store"
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
                {storeList.length > 0 ? (
                  storeList.map((store) => (
                    <tr key={store.uid} className="hover border">
                      <Link
                        onClick={() =>
                          localStorage.setItem("store", JSON.stringify(store))
                        }
                        to={`${store.code}`}
                      >
                        <td className="flex items-center gap-[17px]">
                          <img
                            src="https://s3-alpha-sig.figma.com/img/a8e5/b83e/e461f47e6b5f7786158f8f5f3eb4817d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CI6U4GQBbgwQyv9Ju2E4xXJLONjRqa4zuZEPN7W6cVylnjTo2tkEWz73wXqYGDhjreEUZxncRElUwnoP1rB3Vc~ugFHqYqU4-AuycHXPZvQOsmg~Q0jf~lE46bCwQtm3mFqy-Z2ZyXXBE8IxhdVIO85xQIPiyuJTT2Hlh1u9dwRJJQ9DRmmIOQBE9~mNklM7ju4HY2JlMNpEbRaJuwJLDvH~W9h4KMHjVPdn2NsTUZY~PWNGyNokCFNz221O989do5FUQDI1kBevwX3Cgiu4Bv81sHkHcCLWbhJs4zHIjhvE1-MplyKfEmZPTP~MM-4xTj8q2EZ4aHCPsrzz352eOw__"
                            alt=""
                            className="w-[29px] rounded-full"
                          />
                          <p>{store.name}</p>
                        </td>
                      </Link>
                      <td>{store.code}</td>
                      {/* -----------------------------route update */}
                      <td>
                        <button className="bg-[#ABABAB] rounded-full px-3 py-1 text-white">
                          {store.exposure}
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

export default Account;
