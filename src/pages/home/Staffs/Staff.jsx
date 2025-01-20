import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonPrimary from "../../../components/ButtonPrimary";
import throws from "../../../assets/icons/Throw .png";
import UseGetByStaffName from "../../../hooks/UseGetByStaffName";
import UseGetFavorite_stuff from "../../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import StaffProfileCard from "../../../components/StaffProfileCard/StaffProfileCard";
import UseGetUserReview from "../../../hooks/UseGetUserReview";
import toast from "react-hot-toast";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${day}/${month} ${hours}:${minutes}`;
};

const Staff = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { username } = useParams();
  const { staff } = UseGetByStaffName(username);
  const { userReview } = UseGetUserReview(staff?.uid);

  console.log(username);
  // console.log(staff.uid);
  const { favoriteStuffs, refetch, isLoading } = UseGetFavorite_stuff();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (staff && favoriteStuffs.length > 0) {
      const isStaffLiked = favoriteStuffs.some(
        (favorite) => favorite.uid === staff.uid
      );
      setIsLiked(isStaffLiked);
    }
  }, [staff, favoriteStuffs]);

  const handleHeartToggle = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const response = await axiosPrivate.post(
        `/auth/users/staff/${staff.uid}/like`
      );

      if ([200, 201, 204].includes(response.status)) {
        setIsLiked((prev) => !prev);
        await refetch();

        toast.success(
          isLiked
            ? "あなたはこのスタッフをいいねから削除しました。"
            : "あなたはこのスタッフをいいねしました。",
          {
            position: "top-center",
            duration: 3000, // Adjust duration as needed
          }
        );
      } else {
        throw new Error("Failed to update like status");
      }
    } catch (error) {
      toast.error("何かがうまくいきませんでした。もう一度お試しください。", {
        position: "top-center",
        duration: 3000,
      });
      console.error(
        "Error updating like status:",
        error.response?.data?.detail || error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles
            height="80"
            width="80"
            color="#49BBDF"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="w-full max-w-[430px] mx-auto mb-[120px]">
          <div className="w-full">
            <StaffProfileCard
              staff={staff}
              isLiked={isLiked}
              isProcessing={isProcessing}
              handleHeartToggle={handleHeartToggle}
            />
            <div className="w-full max-w-[348px] mx-auto px-2">
              <div className="mt-10 border-b-2 border-[#E0EAED]">
                <h2 className="font-semibold text-lg text-[#49BBDF]">
                  応援メッセージ
                </h2>
                <div className="mt-4">
                  {userReview?.map((review, index) => (
                    <div
                      key={index}
                      className="border-b-[2px] border-[#E0EAED]"
                    >
                      <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                        <span>ユーザーネーム：{review?.nickname}</span>
                        <span>{formatDate(review?.date)}</span>
                      </h4>
                      <p className="font-medium text-sm text-[#44495B] mt-2 mb-4">
                        {review?.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Link to={`/staff/${username}/billing_screen`}>
                <button className="mt-6 w-full">
                  <ButtonPrimary
                    icon={
                      <img className="mr-4" src={throws} alt="search icon" />
                    }
                    btnText="スローインする！"
                    style="flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-full rounded-full font-hiragino py-[12px] font-bold text-white"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Staff;
