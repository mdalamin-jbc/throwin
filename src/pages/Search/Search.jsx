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
  const [qrErrorMessage, setQrErrorMessage] = useState("");
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  const { storeId, refetch, isLoading, isError } =
    UseStaffDetailsWithStoreId(searchByStuffName);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  console.log(storeId);

  const {
    register,
    setError,
    clearErrors,
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
    try {
      const url = new URL(result.text);
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
        setQrErrorMessage("カメラが見つかりませんでした。");
        return;
      }

      setIsScannerOpen(true);
      setQrErrorMessage("");

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
          setQrErrorMessage("QRコードのスキャンに失敗しました。");
        }
      }
    } catch (error) {
      console.error("Error initializing camera:", error);
      setQrErrorMessage("カメラの初期化にエラーが発生しました。");
    }
  };

  const handleCloseScanner = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setIsScannerOpen(false);
    setQrErrorMessage("");
  };

  const handleSearchStuff = async (staffName = null) => {
    const searchValue = staffName || searchByStuffName;

    if (!searchValue) {
      setError("searchMember", {
        type: "manual",
        message: "メンバー名は必須です",
      });
      return;
    } else {
      clearErrors("searchMember");
    }

    if (staffName) {
      setSearchByStuffName(staffName);
    }

    try {
      if (!isLoading && !isError) {
        navigate(`/member_list/${searchValue}`);
      } else {
        throw new Error("スタッフが見つかりませんでした。");
      }
    } catch (isError) {
      setError("searchMember", {
        type: "manual",
        message: "スタッフが見つかりませんでした。",
      });
    }
  };

  const handleSearchStore = async (storeCode = null) => {
    const searchValue = storeCode || searchStore;

    if (!searchValue) {
      setError("searchStore", {
        type: "manual",
        message: "店舗コードは必須です",
      });
      return;
    } else {
      clearErrors("searchStore");
    }

    try {
      const response = await axiosPublic.get(`/stores/${searchValue}`);
      localStorage.setItem("storeData", JSON.stringify(response.data));
      navigate(`/store/${searchValue}`, {
        state: { storeData: response.data },
      });
    } catch (error) {
      setError("searchStore", {
        type: "manual",
        message: "店舗が見つからないか、エラーが発生しました。",
      });
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

        {qrErrorMessage && (
          <motion.p
            className="text-red-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {qrErrorMessage}
          </motion.p>
        )}
      </motion.div>

      {/* Member Search */}
      <motion.div
        className="w-[342px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="mt-8 mb-4 font-semibold font-hiragino">
          メンバー名から探す
        </h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchStuff();
          }}
        >
          <div className="relative">
            <input
              {...register("searchMember")}
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
          </div>
          {errors.searchMember && (
            <span className="text-red-500 text-sm">
              {errors.searchMember.message}
            </span>
          )}
        </form>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchStore();
          }}
        >
          <div className="relative">
            <input
              {...register("searchStore")}
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
          </div>
          {errors.searchStore && (
            <span className="text-red-500 text-sm">
              {errors.searchStore.message}
            </span>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Search;
