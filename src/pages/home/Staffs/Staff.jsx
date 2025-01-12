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
import { motion } from "framer-motion";

const Staff = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { username } = useParams();
  const { staff } = UseGetByStaffName(username);
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
        Swal.fire({
          icon: "success",
          title: "成功!",
          text: isLiked
            ? "あなたはこのスタッフをいいねから削除しました。"
            : "あなたはこのスタッフをいいねしました。",
          confirmButtonText: "はい",
        });
      } else {
        throw new Error("Failed to update like status");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "エラー!",
        text: "何かがうまくいきませんでした。もう一度お試しください。",
        confirmButtonText: "はい",
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
        <motion.div
          className="min-w-[375px] mx-auto mb-[120px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[430px] mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <StaffProfileCard
                staff={staff}
                isLiked={isLiked}
                isProcessing={isProcessing}
                handleHeartToggle={handleHeartToggle}
              />
            </motion.div>

            <div className="w-[342px] mx-auto">
              <motion.div
                className="mt-10 border-b-[2px] border-[#E0EAED]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-semibold text-lg text-[#49BBDF]">
                  応援メッセージ
                </h2>
                <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                  <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
                </h4>
                <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
                  いつも頑張っている姿に感動してます！
                </h2>
              </motion.div>

              <motion.div
                className="mt-4 border-b-[2px] border-[#E0EAED]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                  <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
                </h4>
                <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
                  いつも頑張っている姿に感動してます！
                </h2>
              </motion.div>

              <Link to={`/staff/${username}/billing_screen`}>
                <motion.button
                  className="mt-6"
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonPrimary
                    icon={
                      <img
                        className="mr-4"
                        src={throws}
                        alt="search icon"
                      />
                    }
                    btnText="スローインする！"
                    style="flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino py-[12px] font-bold text-white"
                  />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Staff;
