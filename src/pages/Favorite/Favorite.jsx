import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Favorite = () => {
  const { favoriteStuffs, refetch, isLoading } = useGetFavoriteStuff();
  const axiosPrivate = useAxiosPrivate();
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(favoriteStuffs)

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
    <div className="w-full mb-[120px]">
      <Helmet>
        <title>Throwin | お気に入り</title>
      </Helmet>

      <TitleBar style="mb-0 w-full" title="お気に入り" icon={null} />

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
        <div className="w-full max-w-[430px] mx-auto px-4 sm:px-6 mt-7 text-[#44495B] grid gap-2">
          {favoriteStuffs.length === 0 ? (
            <div className="text-center mt-10 text-[#9C9C9C]">
              <p>お気に入りのものが見つかりませんでした。</p>
            </div>
          ) : (
            favoriteStuffs.map((staff) => (
              <div key={staff.uid} className="flex items-center shadow-md rounded-lg p-4">
                <Link
                  to={{
                    pathname: `/store/${staff.store_code}/staff/${staff.username}`,
                  }}
                  className="flex-1 flex items-center"
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={
                      staff?.image?.small
                        ? staff?.image?.small
                        : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                    }
                    alt="staff"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-sm">{staff.name}</h3>
                    <p className="font-normal text-xs text-[#9C9C9C]">
                      {staff.introduction}
                    </p>
                  </div>
                </Link>
                <button onClick={() => handleLikeDelete(staff.uid)} className="ml-2">
                  <FaHeart className="text-[#F24E1E] text-xl" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Favorite;