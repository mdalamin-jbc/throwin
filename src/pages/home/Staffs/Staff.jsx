import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ButtonPrimary from "../../../components/ButtonPrimary";
import throws from "../../../assets/icons/Throw .png";
import UseGetByStaffName from "../../../hooks/UseGetByStaffName";
import UseGetFavorite_stuff from "../../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../../hooks/axiousPrivate";

const Staff = () => {
  const [data, setData] = useState([]);
  const [staffMember, setStaffMember] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Prevent rapid toggling
  const { username } = useParams();
  const { staff } = UseGetByStaffName(username);
  const { favoriteStuffs, refetch } = UseGetFavorite_stuff();

  const axiosPrivate = useAxiosPrivate();

  // Log favoriteStuffs for debugging
  // console.log(staff);
  // console.log(favoriteStuffs);
  useEffect(() => {
    if (staff && favoriteStuffs.length > 0) {
      const isStaffLiked = favoriteStuffs.some(
        (favorite) => favorite.uid === staff.uid
      );
      setIsLiked(isStaffLiked);
      // console.log(isStaffLiked);
    }
  }, [staff, favoriteStuffs]);

  // Set initial isLiked state based on whether the staff is already favorited
  useEffect(() => {
    if (favoriteStuffs?.some((item) => item.uid === staff?.uid)) {
      setIsLiked(true);
    }
  }, [favoriteStuffs, staff]);

  // Toggle like state and send appropriate API requests
  const handleHeartToggle = async () => {
    if (isProcessing) return; // Prevent duplicate requests
    setIsProcessing(true);

    try {
      const endpoint = `/auth/users/stuff/${staff.uid}/like`;
      const response = isLiked
        ? await axiosPrivate.delete(endpoint) // DELETE if currently liked
        : await axiosPrivate.post(endpoint);
      refetch();

      console.log("API Response:", response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        setIsLiked((prev) => !prev); // Toggle the like state

        await refetch(); // Ensure refetch is awaited to refresh data properly
      } else {
        throw new Error("Failed to update like status");
      }
    } catch (error) {
      console.error(
        "Error updating like status:",
        error.response?.data?.detail || error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-[430px] mx-auto mb-[120px]">
      <div className="w-[416px] mx-auto">
        <div className="relative">
          <img
            src="https://shorturl.at/XqwIr"
            alt={`${staffMember?.name} image`}
            className="object-cover rounded-lg w-[416px] h-[277px]"
          />

          <div className="absolute bottom-0 left-0 w-[416px] px-6 mb-[22px] p-2 text-white rounded-b-lg">
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

        <div className="bg-[#80D0E91A] pt-5 pb-[17px] px-[26px] w-[416px]">
          <h2 className="font-semibold text-lg mb-2">自己紹介</h2>
          <p className="font-light text-sm">{staff?.introduction}</p>
        </div>
        <div className="w-[342px] mx-auto">
          <div className="mt-10 border-b-[2px] border-[#E0EAED]">
            <h2 className="font-semibold text-lg text-[#49BBDF]">
              応援メッセージ
            </h2>
            <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
              <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
            </h4>
            <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
              いつも頑張っている姿に感動してます！
            </h2>
          </div>
          <div className="mt-4 border-b-[2px] border-[#E0EAED]">
            <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
              <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
            </h4>
            <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
              いつも頑張っている姿に感動してます！
            </h2>
          </div>
          <Link to={`/staff/${username}/billing_screen`}>
            <button className="mt-6">
              <ButtonPrimary
                icon={<img className="mr-4" src={throws} alt="search icon" />}
                btnText="スローインする！"
                style="flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino py-[12px] font-bold text-white"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Staff;
