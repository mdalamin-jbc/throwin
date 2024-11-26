import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import Staff from "../home/Staffs/Staff";
import useAxiosPrivate from "../../hooks/axiousPrivate";

const Favorite = () => {
  const { favoriteStuffs } = useGetFavoriteStuff();
  const axiosPrivate = useAxiosPrivate();
  console.log(favoriteStuffs);

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
    <div className="mb-[120px] ">
      <div>
        <TitleBar title="お気に入り"></TitleBar>
      </div>
      {favoriteStuffs.map((stuff) => (
        <div
          key={stuff.uid}
          className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5"
        >
          <div className="flex items-center">
            <img
              className="w-[49px] rounded-full"
              src="https://shorturl.at/aBtj9"
              alt=""
            />
            <div className="flex-1 flex justify-between  items-center">
              <div className="ml-[13px]">
                <h3 className="font-bold text-sm">{stuff.name}</h3>
                <p className="font-normal text-sm text-[#9C9C9C]">
                  {stuff.introduction}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <h3 className="font-bold text-sm ">
                  <FaHeart className="text-[#F24E1E] text-[20px] mt-4"></FaHeart>
                </h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorite;
