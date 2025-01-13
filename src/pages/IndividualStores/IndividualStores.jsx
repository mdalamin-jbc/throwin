import { IoMdStar } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetStuffsByStoreCode from "../../hooks/UseGetStuffsByStoreCode";
import { Circles } from "react-loader-spinner";

const IndividualStores = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve storeData from location state or localStorage
  const { storeData } = location.state || JSON.parse(localStorage.getItem("storeData")) || {};

  const { store, isLoading } = useGetStuffsByStoreCode(storeData);

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

  // Check if storeData is available before rendering
  if (!storeData) {
    return <div>Error: Store data is missing</div>;
  }

  return (
    <div className="min-w-[375px] mx-auto mb-28">
      <div className="max-w-[430px] mx-auto mb-8 relative">
        {/* Store Image with Gradient Overlay and Store Name */}
        <div className="relative">
          <img
            src="https://s3-alpha-sig.figma.com/img/e5b7/27e5/d85bf08137ca367e755012d701fbcc11?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q9q0UtOHo5kPHHtsn1~ExK5hDVmU7hazSCe--8sH040n1CsRu~VE1y7C9bryOV4UB0NrF0-NE1s4wnc13ZRVrhN~wnSU0KZy1Y8zmx4LXpJBP9Dv7HguG7v9-gSOIM1GQbZKg9fe4z-UMRlAfaHTzXsEBsLCp6BgGs0AVOhVvYHsA5Moquw7gbIf3d7-bUXWRVtHW9rSIbW1LNJhBIvtR8TGNHeSEzcC1G8JN4Nht-tD7k9FD1uroHaWoeSxnuH4T-WP2zo2wEUkNmkCfZYm~AE6sdbezaiJYl76AsNfFQvOzQpXeQzpQnJiDaUIxGE9yrn0OTN6RTN9JR~DN~wZog__"
            alt={`${storeData?.name}`}
            className="w-full"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black opacity-20 "></div>
          {/* Full-width Centered Store Name */}
          <h2 className="absolute bottom-5 left-0 w-full text-center text-white text-2xl font-bold px-2 py-1">
            {storeData?.name || "Store Name"}
          </h2>
        </div>
        <div className="w-[342px] mx-auto flex justify-between mt-8 mb-5 text-[#44495B] items-center">
          <h5 className="font-bold  ">わらび高木店のメンバー</h5>
          <p className="font-normal text-xs">メンバーの一覧({store.length})</p>
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
