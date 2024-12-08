import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState } from "react";
import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import img from "../../assets/images/store&staff/image.png";

const Favorite = () => {
  const { favoriteStuffs, refetch, isLoading } = useGetFavoriteStuff();
  const axiosPrivate = useAxiosPrivate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLikeDelete = async (id) => {
    if (isProcessing) return; // Prevent duplicate requests
    setIsProcessing(true);

    try {
      const response = await axiosPrivate.delete(
        `/auth/users/stuff/${id}/like`
      );
      console.log("API Response:", response);

      if ([200, 201, 204].includes(response.status)) {
        await refetch();
        Swal.fire({
          icon: "success",
          title: "成功！",
          text: "このスタッフへの「いいね」を取り消しました。",
          confirmButtonText: "はい",
          // timer: 1500,
          showConfirmButton: true,
        });
      } else {
        throw new Error("「いいね」のステータスの更新に失敗しました。");
      }
    } catch (error) {
      console.error(
        "Error updating like status:",
        error?.response?.data?.detail || error?.message || "Unknown error"
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
        <div className="mb-[120px]">
          <div>
            <TitleBar title="お気に入り" />
          </div>
          {favoriteStuffs.length === 0 ? (
            <p className="text-center mt-10">No favorite stuffs found.</p>
          ) : (
            favoriteStuffs.map((stuff) => (
              <div
                key={stuff.uid}
                className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 grid gap-5"
              >
                <div className="flex items-center">
                  <img
                    className="w-[49px] h-[49px] rounded-full"
                    src={img}
                    alt=""
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <div className="ml-[13px]">
                      <h3 className="font-bold text-sm">{stuff.name}</h3>
                      <p className="font-normal text-sm text-[#9C9C9C]">
                        {stuff.introduction}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <button onClick={() => handleLikeDelete(stuff.uid)}>
                        <FaHeart className="text-[#F24E1E] text-[20px] mt-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Favorite;
