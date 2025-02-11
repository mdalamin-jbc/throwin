import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Favorite = () => {
  const { favoriteStuffs, refetch, isLoading } = useGetFavoriteStuff();
  const axiosPrivate = useAxiosPrivate();
  const [isProcessing, setIsProcessing] = useState(false);

  console.log(favoriteStuffs);

  const handleLikeDelete = async (id) => {
    if (isProcessing) return; // Prevent duplicate requests
    setIsProcessing(true);

    try {
      const response = await axiosPrivate.post(`/auth/users/staff/${id}/like`);
      console.log("API Response:", response);

      if ([200, 201, 204].includes(response.status)) {
        await refetch(); // Refresh the data
        toast.success("このスタッフへの「いいね」を取り消しました！", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        throw new Error("「いいね」のステータスの更新に失敗しました。");
      }
    } catch (error) {
      console.error(
        "Error updating like status:",
        error?.response?.data?.detail || error?.message || "Unknown error"
      );
      toast.error(
        error?.response?.data?.detail ||
          "「いいね」の取り消し中にエラーが発生しました。",
        {
          duration: 3000,
          position: "top-right",
        }
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
            favoriteStuffs.map((staff) => (
              <div key={staff.uid} className="px-4">
                <div className=" max-w-[430px] mx-auto px-[25px]  grid  shadow-md rounded-lg p-4 ">
                  <div className="flex items-center justify-between">
                    <Link
                      to={{
                        pathname: `/store/${staff.store_code}/staff/${staff.username}`,
                      }}
                      className="flex"
                    >
                      <img
                        className="w-[49px] h-[49px] rounded-full"
                        src={
                          staff.image?.small
                            ? staff.image.small
                            : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                        }
                        alt=""
                      />
                      <div className="flex-1 flex justify-between items-center">
                        <div className="ml-[13px]">
                          <h3 className="font-bold text-sm">{staff.name}</h3>
                          <p className="font-normal text-sm text-[#9C9C9C]">
                            {staff.introduction}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button onClick={() => handleLikeDelete(staff.uid)}>
                      <FaHeart className="text-[#F24E1E] text-[20px] mt-4" />
                    </button>
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
