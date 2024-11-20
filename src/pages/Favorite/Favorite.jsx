import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import Staff from "../home/Staffs/Staff";

const Favorite = () => {
  const { favoriteStuffs } = useGetFavoriteStuff();
  console.log(favoriteStuffs);
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
