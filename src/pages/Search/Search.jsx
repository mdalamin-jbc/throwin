import camera from "../../assets/icons/camera.png";
import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import search from "../../assets/icons/search2.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState, useRef, useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import useAxiosPublic from "../../hooks/axiosPublic";
import { useNavigate } from "react-router-dom";
import UseStaffDetailsWithStoreId from "../../hooks/UseStaffDetailsWithStoreId";
import { motion } from "framer-motion";

const Search = () => {
  const [searchByStuffName, setSearchByStuffName] = useState("");
  const [searchStore, setSearchStore] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const { storeId, isLoading, isError, refetch } =
    UseStaffDetailsWithStoreId(searchByStuffName);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const handleQRCodeResult = (result) => {
    console.log("QR Code Result:", result.text);

    // Check if result.text is a valid URL
    try {
      const url = new URL(result.text);
      // Redirect to the URL
      window.location.href = url.href;
    } catch (error) {
      console.error("Invalid URL in QR Code:", result.text);
    }
  };

  const handleOpenScanner = async () => {
    try {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }

      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      const devices = await codeReader.listVideoInputDevices();

      if (devices.length === 0) {
        setErrorMessage("カメラが見つかりませんでした。");
        return;
      }

      setIsScannerOpen(true);
      setErrorMessage("");

      await new Promise((resolve) => setTimeout(resolve, 100));

      if (videoRef.current) {
        try {
          const result = await codeReader.decodeOnceFromVideoDevice(
            devices[0].deviceId,
            videoRef.current
          );
          await handleQRCodeResult(result);
          setIsScannerOpen(false);
        } catch (err) {
          console.error("QR code scan failed", err);
          setErrorMessage("QRコードのスキャンに失敗しました。");
        }
      }
    } catch (error) {
      console.error("Error initializing camera:", error);
      setErrorMessage("カメラの初期化にエラーが発生しました。");
    }
  };
  

  const handleCloseScanner = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setIsScannerOpen(false);
    setErrorMessage("");
  };

  // search by staff name
  const handleSearchStuff = async (staffName = null) => {
    const searchValue = staffName || searchByStuffName;

    console.log(storeId);

    if (!searchValue) {
      setErrorMessage("メンバー名は必須です");
      return;
    }

    // Update the search input if the name came from QR code
    if (staffName) {
      setSearchByStuffName(staffName);
    }

    refetch();

    if (!isLoading && !isError) {
      setErrorMessage("");
      navigate(`/member_list/${searchValue}`);
    } else if (isError) {
      setErrorMessage("スタッフが見つかりませんでした。");
    }
  };

  const handleSearchStore = async (storeCode = null) => {
    const searchValue = storeCode || searchStore;

    if (!searchValue) {
      setErrorMessage("店舗コードは必須です");
      return;
    }

    try {
      const response = await axiosPublic.get(`/stores/${searchValue}`);

      setErrorMessage("");
      // Store data in localStorage
      localStorage.setItem("storeData", JSON.stringify(response.data));
      navigate(`/store`, { state: { storeData: response.data } });
    } catch (error) {
      setErrorMessage("店舗が見つからないか、エラーが発生しました。");
      console.error("Error fetching store:", error);
    }
  };

  return (
    <div className="min-w-[375px] mx-auto mb-[120px]">
      <TitleBar title={"探す"} />

      {/* QR Scanner Section */}
      <motion.div
        className="w-[342px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="font-hiragino font-semibold text-lg mt-8 mb-4">
          QRコードで探す
        </h4>
        <motion.button
          onClick={handleOpenScanner}
          disabled={isScannerOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ButtonPrimary
            icon={<img className="mr-4" src={camera} alt="search icon" />}
            btnText="カメラを起動する"
            style={`flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-[10px] font-hiragino py-[12px] font-bold text-white ${
              isScannerOpen ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </motion.button>

        {isScannerOpen && (
          <motion.div
            className="relative mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <video
              ref={videoRef}
              className="w-full rounded-lg shadow-lg"
              autoPlay
              playsInline
            />
            <button
              onClick={handleCloseScanner}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-4 py-2"
            >
              閉じる
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.p
            className="text-red-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </motion.div>

      {/* Member Search */}
      <motion.div
        className="w-[342px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration:1 }}
      >
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
            onClick={() => handleSearchStuff()}
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
      </motion.div>

      {/* Store Code Search */}
      <motion.div
        className="w-[342px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="mt-8 mb-4 font-semibold font-hiragino">
          店舗(チーム）コードから探す
        </h4>
        <div className="relative flex flex-col justify-center">
          <input
            {...register("searchStore", {
              required: "店舗コードは必須です",
            })}
            name="searchStore"
            type="text"
            placeholder="店舗(チーム)コードを入力"
            className="w-full rounded-[8px] py-3 pl-4 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
            value={searchStore}
            onChange={(e) => setSearchStore(e.target.value)}
          />
          <div
            onClick={() => handleSearchStore()}
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
      </motion.div>
    </div>
  );
};

export default Search;
