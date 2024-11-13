import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ButtonPrimary from "../../../components/ButtonPrimary";
import throws from "../../../assets/icons/Throw .png";
import useAxiosPublic from "../../../hooks/axiosPublic";
import UseGetByStaffName from "../../../hooks/UseGetByStaffName";

const Staff = () => {
  const [data, setData] = useState([]);
  const [staffMember, setStaffMember] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id, username } = useParams();

  const { staff, refetch, isLoading, isError } = UseGetByStaffName(username);

  console.log(staff);

  useEffect(() => {
    fetch("/stores.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setData(data);

        const matchedStaff = data
          .flatMap((store) => store.items)
          .find((item) => item._id === id);

        setStaffMember(matchedStaff);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, [id]);

  const handleHeartToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="w-[430px] mx-auto mb-[120px]">
      <div className="w-[416px] mx-auto">
        <div className="relative">
          <img
            src={staffMember?.image}
            alt={`${staffMember?.staff_name} image`}
            className="object-cover rounded-lg w-[416px] h-[277px]"
          />

          <div className="absolute bottom-0 left-0 w-[416px] px-6 mb-[22px] p-2 text-white rounded-b-lg">
            <div className="flex justify-between items-center">
              <div className="bg-white text-[#F06464] flex items-center gap-1 px-2 py-1 rounded-full shadow-md">
                <IoMdStar />
                {staffMember?.rating}
              </div>
              <h3 className="text-2xl font-bold">{staffMember?.staff_name}</h3>
              <div
                className="text-2xl font-bold cursor-pointer"
                onClick={handleHeartToggle}
              >
                {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#80D0E91A]  pt-5 pb-[17px] px-[26px] w-[416px] ">
          <h2 className="font-semibold text-lg mb-2">自己紹介</h2>
          <p className="font-light text-sm">{staffMember?.self_introduction}</p>
        </div>
        <div className="w-[342px] mx-auto">
          <div className="mt-10  border-b-[2px] border-[#E0EAED]">
            <h2 className="font-semibold text-lg text-[#49BBDF]">
              応援メッセージ
            </h2>
            <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
              <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
            </h4>
            <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
              いつも頑張っている姿に感動してます！
            </h2>
          </div>
          <div className="mt-4  border-b-[2px] border-[#E0EAED]">
            <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
              <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
            </h4>
            <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
              いつも頑張っている姿に感動してます！
            </h2>
          </div>
          <Link to={`/staff/${id}/billing_screen`}>
            <button className="mt-6">
              <ButtonPrimary
                icon={<img className="mr-4" src={throws} alt="search icon" />}
                btnText="スローインする！"
                style="flex justify-center bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino py-[12px] font-bold text-white"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Staff;
