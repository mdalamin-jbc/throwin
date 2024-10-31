import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import search from "../../assets/icons/search2.png";
import camera from "../../assets/icons/camera.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState } from "react"; // Import useState

const Gacha = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log(value); 
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true); 
  };

  return (
    <div className="w-[390px] mx-auto">
      <TitleBar title={"スタッフを探す"} />
      <h4 className="mt-8 mb-4 font-semibold font-hiragino w-[342px] mx-auto">
        店舗から探す
      </h4>

      <div className="flex flex-col justify-center">
        <form className="flex flex-col w-[342px] mx-auto">
          <div className="relative flex items-center w-full">
            <input
              {...register("name", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "無効なメール形式です",
                },
              })}
              name="name"
              type="text"
              placeholder="店舗コードを入力"
              className="w-full rounded-[8px] py-3 pl-4 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange} // Call handleSearchChange on input change
            />
            <div
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img
                className="w-5 h-5 opacity-70"
                src={search}
                alt="search icon"
              />
            </div>
          </div>
          {errors.name && (
            <span className="text-red-500 mt-1">{errors.name.message}</span>
          )}
        </form>
      </div>

      {/* QR Scanner Section */}
      <div className="w-[342px] mx-auto">
        <h4 className="font-hiragino font-semibold text-lg mt-8 mb-4">
          QRコードで探す
        </h4>
        <button onClick={handleOpenScanner} className=" ">
          <ButtonPrimary
            icon={<img className="mr-4" src={camera} alt="search icon" />}
            btnText="新規登録"
            style="flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-[10px] font-hiragino py-[12px] font-bold text-white"
          />
        </button>
      </div>

      {/* Conditional QR Scanner Component */}
      {isScannerOpen && (
        <div className="w-[342px] mx-auto mt-4">
          <p className="text-center font-hiragino font-semibold text-lg">
            QR Scanner is Open
          </p>
          {/* Insert your QR scanner component here */}
        </div>
      )}
    </div>
  );
};

export default Gacha;
