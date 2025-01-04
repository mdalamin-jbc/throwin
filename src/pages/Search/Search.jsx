import { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from '@zxing/library';
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosPublic from "../../hooks/axiosPublic";
import UseGetStaffListByStaffName from "../../hooks/UseGetStaffListByStaffName";
import { Camera } from "lucide-react";

const Search = () => {
  const [searchByStuffName, setSearchByStuffName] = useState("");
  const [searchStore, setSearchStore] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stuffData, setStuffData] = useState(null);

  const codeReaderRef = useRef(null);
  const videoRef = useRef(null);
  const searchInputRef = useRef(null);
  const storeInputRef = useRef(null);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setError,
    clearErrors
  } = useForm();

  const { staffs, isLoading: staffLoading, isError, refetch } = 
    UseGetStaffListByStaffName(searchByStuffName);

  // Enhanced QR Scanner Setup
  const setupScanner = useCallback(async () => {
    try {
      if (!codeReaderRef.current) {
        codeReaderRef.current = new BrowserMultiFormatReader();
      }

      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();
      const selectedDevice = videoInputDevices[0]?.deviceId;

      if (selectedDevice && videoRef.current) {
        await codeReaderRef.current.decodeFromVideoDevice(
          selectedDevice,
          videoRef.current,
          (result) => {
            if (result) {
              const url = result.getText();
              if (url && url.startsWith('http')) {
                setIsScannerOpen(false);
                window.location.href = url;
              }
            }
          }
        );
      }
    } catch (error) {
      console.error('Scanner setup failed:', error);
      setErrorMessage("カメラの起動に失敗しました");
    }
  }, []);

  // Enhanced Scanner Cleanup
  const cleanupScanner = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
      
      // Ensure all tracks are stopped
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, []);

  // Scanner Toggle with Animation
  const handleScannerToggle = useCallback(() => {
    setIsScannerOpen(prev => !prev);
    setErrorMessage("");
  }, []);

  // Enhanced Search Staff Function
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

  // Enhanced Search Store Function
  const handleSearchStore = useCallback(async () => {
    if (!searchStore.trim()) {
      setError("searchStore", { 
        type: "required", 
        message: "店舗コードは必須です" 
      });
      storeInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    clearErrors("searchStore");

    try {
      const response = await axiosPublic.get(`/stores/${searchStore}`);
      if (response.data) {
        navigate(`/store`, { state: { storeData: response.data } });
      }
    } catch (error) {
      setError("searchStore", { 
        type: "notFound", 
        message: "店舗が見つかりませんでした" 
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchStore, axiosPublic, navigate, setError, clearErrors]);

  // Scanner Effect
  useEffect(() => {
    if (isScannerOpen) {
      setupScanner();
    } else {
      cleanupScanner();
    }

    return () => cleanupScanner();
  }, [isScannerOpen, setupScanner, cleanupScanner]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (document.activeElement === searchInputRef.current) {
          handleSearchStuff();
        } else if (document.activeElement === storeInputRef.current) {
          handleSearchStore();
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleSearchStuff, handleSearchStore]);

  return (
    <div className="min-w-[375px] mx-auto mb-[120px] bg-white">
      <TitleBar title={"スタッフを探す"} />

      {/* QR Scanner Section with Animation */}
      <div className="w-[342px] mx-auto">
        <h4 className="font-hiragino font-semibold text-lg mt-8 mb-4">
          QRコードで探す
        </h4>
        
        {isScannerOpen ? (
          <div className="animate-fadeIn">
            <div className="relative rounded-lg overflow-hidden shadow-lg mb-4">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 border-4 border-blue-400 animate-pulse opacity-50" />
            </div>
            <button
              onClick={handleScannerToggle}
              className="w-full px-4 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 active:transform active:scale-95"
            >
              スキャナーを閉じる
            </button>
          </div>
        ) : (
          <button
            onClick={handleScannerToggle}
            className="w-full transition-transform active:scale-95"
          >
            <ButtonPrimary
              icon={<Camera className="mr-2 h-5 w-5" />}
              btnText="QRコードをスキャン"
              style="flex items-center justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-full rounded-lg py-3 font-bold text-white shadow-md hover:shadow-lg transition-all"
            />
          </button>
        )}
      </div>

      {/* Member Search Section */}
      <div className="w-[342px] mx-auto mt-8">
        <h4 className="font-semibold font-hiragino mb-4">
          メンバー名から探す
        </h4>
        <div className="relative">
          <input
            {...register("searchMember")}
            ref={searchInputRef}
            type="text"
            placeholder="メンバー名を入力"
            className="w-full rounded-lg py-3 px-4 border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm"
            value={searchByStuffName}
            onChange={(e) => setSearchByStuffName(e.target.value)}
          />
          <button
            onClick={handleSearchStuff}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        {errors.searchMember && (
          <p className="mt-2 text-sm text-red-500 animate-fadeIn">
            {errors.searchMember.message}
          </p>
        )}
      </div>

      {/* Store Search Section */}
      <div className="w-[342px] mx-auto mt-8">
        <h4 className="font-semibold font-hiragino mb-4">
          店舗コードから探す
        </h4>
        <div className="relative">
          <input
            {...register("searchStore")}
            ref={storeInputRef}
            type="text"
            placeholder="店舗コードを入力"
            className="w-full rounded-lg py-3 px-4 border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm"
            value={searchStore}
            onChange={(e) => setSearchStore(e.target.value)}
          />
          <button
            onClick={handleSearchStore}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        {errors.searchStore && (
          <p className="mt-2 text-sm text-red-500 animate-fadeIn">
            {errors.searchStore.message}
          </p>
        )}
      </div>

      {/* Global Error Message */}
      {errorMessage && (
        <div className="w-[342px] mx-auto mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Search;