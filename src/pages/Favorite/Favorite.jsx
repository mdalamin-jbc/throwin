import { useState, useEffect } from "react";
import TitleBar from "../../components/TitleBar";
import { FaHeart } from "react-icons/fa";
import useGetFavoriteStuff from "../../hooks/UseGetFavorite_stuff";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "userFavorites";

const Favorite = () => {
  const { favoriteStuffs, refetch, isLoading } = useGetFavoriteStuff();
  const [localFavorites, setLocalFavorites] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  
  // Initialize favorites from both API and local storage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Load local favorites first
        const savedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedFavorites) {
          setLocalFavorites(JSON.parse(savedFavorites));
        }
        
        // Then fetch from API
        await refetch();
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, [refetch]);

  // Update local storage whenever favorites change
  useEffect(() => {
    if (favoriteStuffs?.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriteStuffs));
      setLocalFavorites(favoriteStuffs);
    }
  }, [favoriteStuffs]);

  const handleLikeDelete = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const response = await axiosPrivate.post(`/auth/users/staff/${id}/like`);
      
      if ([200, 201, 204].includes(response.status)) {
        // Update local storage first for immediate UI feedback
        const updatedFavorites = localFavorites.filter(staff => staff.uid !== id);
        setLocalFavorites(updatedFavorites);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
        
        // Then refresh server data
        await refetch();
        
        toast.success("このスタッフへの「いいね」を取り消しました！", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        throw new Error("「いいね」のステータスの更新に失敗しました。");
      }
    } catch (error) {
      console.error("Error updating like status:", error?.response?.data?.detail || error?.message || "Unknown error");
      
      // Revert local changes if server update fails
      const savedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedFavorites) {
        setLocalFavorites(JSON.parse(savedFavorites));
      }
      
      toast.error(
        error?.response?.data?.detail || "「いいね」の取り消し中にエラーが発生しました。",
        {
          duration: 3000,
          position: "top-right",
        }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Display loading state only during initial load
  if (isLoading && localFavorites.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  // Use local favorites for rendering to ensure persistence
  const displayFavorites = localFavorites.length > 0 ? localFavorites : favoriteStuffs;

  return (
    <div className="mb-[120px]">
      <div>
        <TitleBar title="お気に入り" />
      </div>
      {displayFavorites.length === 0 ? (
        <p className="text-center mt-10">No favorite stuffs found.</p>
      ) : (
        <div className="space-y-4">
          {displayFavorites.map((staff) => (
            <div key={staff.uid} className="px-4">
              <div className="max-w-[430px] mx-auto px-[25px] shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <Link 
                    to={`/staff/${staff.username}`} 
                    className="flex flex-1 items-center"
                  >
                    <img
                      className="w-[49px] h-[49px] rounded-full object-cover"
                      src={
                        staff.image?.small
                          ? staff.image.small
                          : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                      }
                      alt={`${staff.name}'s profile`}
                      loading="lazy"
                    />
                    <div className="ml-[13px] flex-1">
                      <h3 className="font-bold text-sm">{staff.name}</h3>
                      <p className="font-normal text-sm text-[#9C9C9C] line-clamp-2">
                        {staff.introduction}
                      </p>
                    </div>
                  </Link>
                  <button 
                    onClick={() => handleLikeDelete(staff.uid)}
                    className="ml-4 p-2 transition-transform duration-200 hover:scale-110"
                    disabled={isProcessing}
                  >
                    <FaHeart className="text-[#F24E1E] text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;