import { IoMdStar } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import useGetStuffsByStoreCode from "../../hooks/UseGetStuffsByStoreCode";
import { Circles } from "react-loader-spinner";

const IndividualStores = () => {
  const location = useLocation();
  const { storeData } = location.state || {};
  const { store, isLoading } = useGetStuffsByStoreCode(storeData);

  console.log(storeData);
  console.log(store);

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
    <div className="min-w-[375px] mx-auto mb-28">
      <div className="max-w-[430px] mx-auto mb-8 relative">
        {/* Store Image with Gradient Overlay and Store Name */}
        <div className="relative">
          <img
            src="https://i.postimg.cc/W455mjgq/277cc67ba2f22b5bc0996cea559fc8af.png"
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
        {store.map((staff, uid) => (
          <div key={uid}>
            <Link
              to={{
                pathname: `/staff/${staff.username}`,
                state: { staffData: staff }, // Pass the staff data as state
              }}
            >
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
