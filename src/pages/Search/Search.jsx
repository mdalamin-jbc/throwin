
import search from "../../assets/icons/search2.png";
import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";

import camera from "../../assets/icons/camera.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library"; // New QR reader
import useAxiosPublic from "../../hooks/axiosPublic";
import { useNavigate } from "react-router-dom";
import UseGetStaffListByStaffName from "../../hooks/UseGetStaffListByStaffName";

const Search = () => {
  const [searchByStuffName, setSearchByStuffName] = useState("");
  const [searchStore, setSearchStore] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [stuffData, setStuffData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  const { staffs, isLoading, isError, refetch } = UseGetStaffListByStaffName(searchByStuffName);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { register, formState: { errors } } = useForm();

  // Cleanup function for QR scanner
  useEffect(() => {
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

 // Inside your handleOpenScanner function:

const handleOpenScanner = async () => {
  try {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }

    const codeReader = new BrowserMultiFormatReader(); // Updated reader
    codeReaderRef.current = codeReader;

    const devices = await codeReader.listVideoInputDevices();

    if (devices.length === 0) {
      setErrorMessage("カメラが見つかりませんでした。");
      return;
    }

    setIsScannerOpen(true);
    setErrorMessage("");

    await new Promise(resolve => setTimeout(resolve, 100));

    if (videoRef.current) {
      try {
        const result = await codeReader.decodeOnceFromVideoDevice(devices[0].deviceId, videoRef.current);
        const scannedText = result.text;
        
        // Try to handle as a store code first
        try {
          const response = await axiosPublic.get(`/stores/${scannedText}`);
          setSearchStore(scannedText);
          setStoreData(response.data);
          setIsScannerOpen(false);
          navigate(`/store`, { state: { storeData: response.data } });
        } catch (error) {
          setSearchByStuffName(scannedText);
          refetch();
          if (!isLoading && !isError) {
            setStuffData(staffs);
            setIsScannerOpen(false);
            navigate(`/member_list/${scannedText}`);
          } else {
            setErrorMessage("有効な店舗コードまたはメンバー名ではありません。");
          }
        }
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

  const handleSearchStuff = async () => {
    if (!searchByStuffName) {
      setErrorMessage("メンバー名は必須です");
      return;
    }

    refetch();

    if (!isLoading && !isError) {
      setStuffData(staffs);
      setErrorMessage("");
      navigate(`/member_list/${searchByStuffName}`);
    } else if (isError) {
      setErrorMessage("スタッフが見つかりませんでした。");
    }
  };

  const handleSearchStore = async (qrCode = null) => {
    const searchValue = qrCode || searchStore;
    
    if (!searchValue) {
      setErrorMessage("店舗コードは必須です");
      return;
    }

    try {
      const response = await axiosPublic.get(`/stores/${searchValue}`);
      setStoreData(response.data);
      setErrorMessage("");
      navigate(`/store`, { state: { storeData: response.data } });
    } catch (error) {
      setErrorMessage("店舗が見つからないか、エラーが発生しました。");
      console.error("Error fetching store:", error);
    }
  };

  return (
    <div className="min-w-[375px] mx-auto mb-[120px]">
      <TitleBar title={"スタッフを探す"} />

      {/* QR Scanner Section */}
      <div className="w-[342px] mx-auto">
        <h4 className="font-hiragino font-semibold text-lg mt-8 mb-4">
          QRコードで探す
        </h4>
        <button 
          onClick={handleOpenScanner}
          disabled={isScannerOpen}
        >
          <ButtonPrimary
            icon={<img className="mr-4" src={camera} alt="search icon" />}
            btnText="QRコードをスキャン"
            style={`flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-[10px] font-hiragino py-[12px] font-bold text-white ${isScannerOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </button>

        {isScannerOpen && (
          <div className="relative mt-4">
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
          </div>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
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
            <img className="w-5 h-5 opacity-70" src={search} alt="search icon" />
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
            onChange={(e) => setSearchStore(e.target.value)}
          />
          <div
            onClick={() => handleSearchStore()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img className="w-5 h-5 opacity-70" src={search} alt="search icon" />
          </div>
          {errors.searchStore && (
            <span className="text-red-500 mt-1">
              {errors.searchStore.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
