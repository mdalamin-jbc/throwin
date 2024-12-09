import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import search from "../../assets/icons/search2.png";
import camera from "../../assets/icons/camera.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState } from "react";
import useAxiosPublic from "../../hooks/axiosPublic";
import { useNavigate } from "react-router-dom";
import UseGetByStaffName from "../../hooks/UseGetByStaffName";
import UseGetStaffListByStaffName from "../../hooks/UseGetStaffListByStaffName";

const Search = () => {
  const [searchByStuffName, setSearchByStuffName] = useState("");
  const [searchStore, setSeararchStore] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [stuffData, setStuffData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { staffs, isLoading, isError, refetch } =
    UseGetStaffListByStaffName(searchByStuffName);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleSearchStuff = async () => {
    if (!searchByStuffName) {
      setErrorMessage("メンバー名は必須です");
      return;
    }

    refetch();

    if (!isLoading && !isError) {
      setStuffData(staffs);
      setErrorMessage("");
      console.log("Fetched staff data:", staffs);

      // Navigate to the detail page with the staff data
      navigate(`/member_list/${searchByStuffName}`);
    } else if (isError) {
      setErrorMessage("スタッフが見つかりませんでした。");
    }
  };

  // Handle store search
  const handleSearchStore = async () => {
    if (!searchStore) {
      setErrorMessage("店舗コードは必須です");
      return;
    }
    try {
      const response = await axiosPublic.get(`/stores/${searchStore}`);
      setStoreData(response.data);
      setErrorMessage("");

      console.log(response);

      // Redirect to the store page and send store data
      navigate(`/store`, { state: { storeData: response.data } });
    } catch (error) {
      setErrorMessage("Store not found or an error occurred.");
      console.error("Error fetching store:", error);
    }
  };

  return (
    <div className="min-w-[375px] mx-auto  mb-[120px]">
      <TitleBar title={"スタッフを探す"} />

      {/* QR Scanner Section */}
      <div className="w-[342px] mx-auto">
        <h4 className="font-hiragino font-semibold text-lg mt-8 mb-4">
          QRコードで探す
        </h4>
        <button onClick={handleOpenScanner}>
          <ButtonPrimary
            icon={<img className="mr-4" src={camera} alt="search icon" />}
            btnText="新規登録"
            style="flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-[10px] font-hiragino py-[12px] font-bold text-white"
          />
        </button>
      </div>

      {/* Member Search */}
      <div className="w-[342px] mx-auto">
        <h4 className="mt-8 mb-4 font-semibold font-hiragino">
          メンバー名から探す
        </h4>
        <div className="relative flex flex-col justify-center">
          <input
            {...register("searchMember", {
              required: "メンバー名は必須です",
            })}
            name="searchMember"
            type="text"
            placeholder="メンバー名を入力"
            className="w-full rounded-[8px] py-3 pl-4 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
            value={searchByStuffName}
            onChange={(e) => setSearchByStuffName(e.target.value)}
          />
          <div
            onClick={handleSearchStuff}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img
              className="w-5 h-5 opacity-70"
              src={search}
              alt="search icon"
            />
          </div>
          {errors.searchMember && (
            <span className="text-red-500 mt-1">
              {errors.searchMember.message}
            </span>
          )}
        </div>
      </div>

      {/* Store Code Search */}
      <div className="w-[342px] mx-auto">
        <h4 className="mt-8 mb-4 font-semibold font-hiragino">
          店舗コードから探す
        </h4>
        <div className="relative flex flex-col justify-center">
          <input
            {...register("searchStore", {
              required: "店舗コードは必須です",
            })}
            name="searchStore"
            type="text"
            placeholder="店舗コードを入力"
            className="w-full rounded-[8px] py-3 pl-4 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
            value={searchStore}
            onChange={(e) => setSeararchStore(e.target.value)}
          />
          <div
            onClick={handleSearchStore}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img
              className="w-5 h-5 opacity-70"
              src={search}
              alt="search icon"
            />
          </div>
          {errors.searchStore && (
            <span className="text-red-500 mt-1">
              {errors.searchStore.message}
            </span>
          )}
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Search;
