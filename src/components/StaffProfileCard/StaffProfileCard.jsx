
import { IoMdStar } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const StaffProfileCard = ({
  staff,
  isLiked,
  isProcessing,
  handleHeartToggle,
}) => {
  return (
    <>
      <div className="relative">
        <img
          src="https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
          alt={`${staff?.name} image`}
          className="object-cover rounded-lg w-full h-[277px]"
        />

        <div className="absolute bottom-0 left-0 w-full px-6 mb-[22px] p-2 text-white rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="bg-white text-[#F06464] flex items-center gap-1 px-2 py-1 rounded-full shadow-md">
              <IoMdStar />
              {staff?.score}
            </div>
            <h3 className="text-2xl font-bold">{staff?.name}</h3>
            <div
              className={`text-2xl font-bold cursor-pointer ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={!isProcessing ? handleHeartToggle : undefined}
            >
              {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#80D0E91A] pt-5 pb-[17px] px-[26px] max-w-[416px]">
        <h2 className="font-semibold text-lg mb-2">自己紹介</h2>
        <p className="font-light text-sm">{staff?.introduction}</p>
      </div>
    </>
  );
};

export default StaffProfileCard;
