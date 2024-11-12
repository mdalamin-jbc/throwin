import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import search from "../../assets/icons/search2.png";
import camera from "../../assets/icons/camera.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState } from "react";
import useAxiosPublic from "../../hooks/axiosPublic";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTermMember, setSearchTermMember] = useState("");
  const [searchTermStore, setSearchTermStore] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [stuffData, setStuffData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  // Handle member search
  const handleSearchMember = async () => {
    if (!searchTermMember) {
      setErrorMessage("メンバー名は必須です");
      return;
    }

    try {
      const response = await axiosPublic.get(
        `/store/${searchTermMember}/stuff/list`
      );

      // Check if there are results
      if (response.data && response.data.count > 0) {
        console.log(response.data);
        setStuffData(response.data.results); // Update state with stuff data
        setErrorMessage(""); // Clear any previous error message

        // Redirect to stuff_list page with response data as state
        navigate("/stuff_list", {
          state: { stuffData: response.data.results },
        });
      } else {
        setErrorMessage("No members found.");
      }
    } catch (error) {
      setErrorMessage("Store not found or an error occurred.");
      console.error("Error fetching store:", error);
    }
  };

  // Handle store search
  const handleSearchStore = async () => {
    if (!searchTermStore) {
      setErrorMessage("店舗コードは必須です");
      return;
    }
    try {
      const response = await axiosPublic.get(`/store${searchTermStore}`);
      setStoreData(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Store not found or an error occurred.");
      console.error("Error fetching store:", error);
    }
  };

  return (
    <div className="w-[390px] mx-auto  mb-[120px]">
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
            value={searchTermMember}
            onChange={(e) => setSearchTermMember(e.target.value)}
          />
          <div
            onClick={handleSearchMember}
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
            value={searchTermStore}
            onChange={(e) => setSearchTermStore(e.target.value)}
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
        {storeData && (
          <div className="mt-4 p-4 border rounded bg-gray-100 ">
            <h5 className="font-bold">{storeData.name}</h5>
            <p>Code: {storeData.code}</p>
            <p>Description: {storeData.description || "No description"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
