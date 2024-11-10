import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";

const IndividualStores = () => {
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
    <div className="w-[430px] mx-auto mb-28">
      {data.map((store, index) => (
        <div key={index} className="mb-8 relative">
          {/* Store Image with Gradient Overlay and Store Name */}
          <div className="relative">
            <img
              src={store.storeImage}
              alt={`${store.storeName} image`}
              className="w-full rounded-lg"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            {/* Full-width Centered Store Name */}
            <h2 className="absolute bottom-5 left-0 w-full text-center text-white text-2xl font-bold px-2 py-1">
              {store.storeName}
            </h2>
          </div>
          <div className="w-[342px] mx-auto flex justify-between mt-8 mb-5 text-[#44495B] items-center">
            <h5 className="font-bold  ">わらび高木店のメンバー</h5>
            <p className="font-normal text-xs">メンバーの一覧(1)</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-[342px] mx-auto ">
            {store.items.map((staff, idx) => (
              <Link to={`/staff/${staff._id}`} key={idx}>
                <div className="relative">
                  <img
                    src={staff.image}
                    alt={`${staff.staff_name} image`}
                    className="object-cover rounded-lg w-[170px] h-[170px]"
                  />
                  {/* Rating in the top right corner */}
                  <div className="absolute top-[6px] right-[6px] bg-white text-[#49BBDF] flex items-center gap-1 px-2 py-1 rounded-[4px] shadow-md">
                    <IoMdStar />
                    {staff.rating}
                  </div>
                  {/* Name and Type in the bottom left corner */}
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full p-2 text-white rounded-b-lg">
                    <h3 className="text-sm font-semibold">
                      {staff.staff_name}
                    </h3>
                    <p className="text-xs">{staff.type}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndividualStores;
