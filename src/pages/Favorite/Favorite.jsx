import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useState } from "react";
import Swal from "sweetalert2";

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
          title: "Success!",
          text: "You have unliked this item.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to update like status");
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
          {/* Replace this with your loading spinner or text */}
          <div className="text-lg font-bold text-gray-600">Loading...</div>
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
                    className="w-[49px] rounded-full"
                    src="https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
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
