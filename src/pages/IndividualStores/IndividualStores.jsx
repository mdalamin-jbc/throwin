import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import useGetStuffsByStoreCode from "../../hooks/UseGetStuffsByStoreCode";

const IndividualStores = () => {
  const location = useLocation();
  const { storeData } = location.state || {};
  const { stuffs, refetch, isLoading, isError } =
    useGetStuffsByStoreCode(storeData);

  console.log(storeData);
  console.log(stuffs);
  // change this data after get final data
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/stores.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  return (
    <div className="min-w-[375px] mx-auto mb-28">
      <div className="max-w-[430px] mx-auto mb-8 relative">
        {/* Store Image with Gradient Overlay and Store Name */}
        <div className="relative">
          <img
            src="https://shorturl.at/Wzc2X"
            alt={`${storeData.name} `}
            className="w-full rounded-lg"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          {/* Full-width Centered Store Name */}
          <h2 className="absolute bottom-5 left-0 w-full text-center text-white text-2xl font-bold px-2 py-1">
            {storeData.name}
          </h2>
        </div>
        <div className="w-[342px] mx-auto flex justify-between mt-8 mb-5 text-[#44495B] items-center">
          <h5 className="font-bold  ">わらび高木店のメンバー</h5>
          <p className="font-normal text-xs">メンバーの一覧(1)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-[342px] mx-auto ">
        {stuffs.map((staff, uid) => (
          <div key={uid}>
            <Link to={`/staff/${staff.username}`}>
              <div className="relative">
                <img
                  src="https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                  alt={`${staff.username} image`}
                  className="object-cover rounded-lg w-[170px] h-[170px]"
                />
                {/* Rating in the top right corner */}
                <div className="absolute top-[6px] right-[6px] bg-white text-[#49BBDF] flex items-center gap-1 px-2 py-1 rounded-[4px] shadow-md">
                  <IoMdStar />
                  {staff.score}
                </div>
                {/* Name and Type in the bottom left corner */}
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full p-2 text-white rounded-b-lg">
                  <h3 className="text-sm font-semibold">{staff.username}</h3>
                  <p className="text-xs">{staff.introduction}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualStores;
