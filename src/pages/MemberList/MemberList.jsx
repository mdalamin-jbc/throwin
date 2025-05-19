import { useState, useEffect } from "react";
import search from "../../assets/icons/search2.png";
import logo from "../../assets/images/home/logo.png";
import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import { Link, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { IoMdStar } from "react-icons/io";
import UseStaffDetailsWithStoreId from "../../hooks/UseStaffDetailsWithStoreId";

const MemberList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { staffName } = useParams();
  const { storeId, isLoading } = UseStaffDetailsWithStoreId(staffName);
  const [loadingImages, setLoadingImages] = useState({});

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (storeId) {
      setSearchData(storeId);
      // Initialize loading state for all images
      const initialLoadingState = {};
      storeId.forEach((staff) => {
        initialLoadingState[staff.username] = true;
      });
      setLoadingImages(initialLoadingState);
    }
  }, [storeId]);

  const handleSearchByUserName = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setSearchData(storeId);
    } else {
      const filteredData = storeId.filter((staff) =>
        staff.name.toLowerCase().includes(value)
      );
      setSearchData(filteredData);
    }
  };

  const handleImageLoad = (username) => {
    setLoadingImages((prev) => ({
      ...prev,
      [username]: false,
    }));
  };

  const handleImageError = (username) => {
    setLoadingImages((prev) => ({
      ...prev,
      [username]: false,
    }));
  };

  if (isLoading) {
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

  return (
    <div className="mb-28">
      <div>
        <TitleBar
          style=""
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo " />
          }
          title="" // Pass the required title prop
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col max-w-[342px] mx-auto justify-center mt-4">
          <form className="flex flex-col w-full mx-auto">
            <div className="relative flex items-center w-full">
              <input
                {...register("name", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "無効なメール形式です",
                  },
                })}
                name="name"
                type="text"
                placeholder="スタッフ名を入力してください"
                className="w-full rounded-[8px] py-3 pl-4 pr-10 border border-[#D9D9D9] text-[#44495B] text-sm placeholder-gray-400 focus:outline-none focus:border-[#707070] shadow-sm"
                value={searchTerm}
                onChange={handleSearchByUserName}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img
                  onClick={() =>
                    handleSearchByUserName({ target: { value: searchTerm } })
                  }
                  className="w-5 h-5 opacity-70 cursor-pointer"
                  src={search}
                  alt="search icon"
                />
              </div>
            </div>
            {errors.name && (
              <span className="text-red-500 mt-1">{errors.name.message}</span>
            )}
          </form>
        </div>
        <h2 className="flex justify-end font-normal text-xs max-w-[342px] m-[14px] mx-auto">
          チーム・店舗の一覧({searchData.length})
        </h2>

        {/* Team Images */}
        <div className="grid grid-cols-2 gap-3 max-w-[342px] mx-auto">
          {searchData.length > 0 ? (
            searchData.map((staff, index) => (
              <div
                key={index}
                className="relative w-full max-w-[170px] h-[170px] mx-auto"
              >
                <Link
                  to={{
                    pathname: `/store/${staff.store_code}/staff/${staff.username}`,
                    state: { staffData: staff },
                  }}
                  onClick={() =>
                    localStorage.setItem("staff", JSON.stringify(staff))
                  }
                >
                  <div className="relative">
                    {/* Image loading skeleton using Daisy UI */}
                    {loadingImages[staff.username] && (
                      <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                        <div className="skeleton h-[170px] w-[170px] rounded-lg"></div>
                      </div>
                    )}

                    {/* Box image */}
                    <img
                      src={
                        staff.image?.medium
                          ? staff.image.medium
                          : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                      }
                      alt={`${staff.username} image`}
                      className={`object-cover rounded-lg w-[170px] h-[170px] ${
                        loadingImages[staff.username]
                          ? "opacity-0"
                          : "opacity-100"
                      } transition-opacity duration-300`}
                      onLoad={() => handleImageLoad(staff.username)}
                      onError={() => handleImageError(staff.username)}
                    />

                    {/* Only show these elements when image is loaded */}
                    {!loadingImages[staff.username] && (
                      <>
                        {/* Rating in the top right corner */}
                        <div className="absolute top-[6px] right-[6px] bg-white text-[#49BBDF] flex items-center gap-1 px-2 py-1 rounded-[4px] shadow-md">
                          <IoMdStar />
                          {staff.score}
                        </div>
                        {/* Name and Type in the bottom left corner */}
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full p-2 text-white rounded-b-lg">
                          <h3 className="text-sm font-semibold">
                            {staff.name}
                          </h3>
                          <p className="text-xs">{staff.introduction}</p>
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-2 sm:col-span-3">
              結果が見つかりません。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberList;
