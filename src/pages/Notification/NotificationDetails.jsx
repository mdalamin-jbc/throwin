import { RiArrowLeftSLine } from "react-icons/ri";
import TitleBar from "../../components/TitleBar";
import logo from "../../assets/logo/logo4.png";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

const NotificationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  console.log(id);

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notification-details", id],
    queryFn: async () => {
      const res = await axiosPrivate.get(`notifications/${id}`);
      return res.data;
    },
    enabled: Boolean(id),
  });

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {error?.response?.data || error.message}
      </p>
    );
  }

  console.log(data);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles
            height="80"
            width="80"
            color="#49BBDF"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div>
            <TitleBar back={null} icon={null} title="お気に入り"></TitleBar>
          </div>
          <div className="min-w-[375px] max-w-[430px] mx-auto  mt-3 text-[#44495B] mb-[160px]">
        <div className="flex justify-between items-end px-[15px] border-b-[1.5px] pb-2">
          <div className="flex items-center text-[#9F9F9F] font-medium">
            <RiArrowLeftSLine
              onClick={() => navigate(-1)}
              className="text-2xl cursor-pointer"
            />
            <p>戻る</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-[#49BBDF] w-[57px] h-[57px] flex justify-center items-center rounded-full">
              <img src={logo} alt="" className="" />
            </div>
            <h2 className="font-semibold text-base">Throwin公式</h2>
          </div>
          <div></div>
        </div>
        <div className="mt-3 px-[23px] flex gap-2">
          <div className="">
            <div className="bg-[#49BBDF] w-[40px] h-[40px] flex justify-center items-center rounded-full">
              <img src={logo} alt="" className="" />
            </div>
          </div>
          <div className="bg-[#F0F3F4] py-4 px-[18px] rounded-[22px] flex-1">
            <h4 className="font-semibold">{data.title}</h4>
            <p className="mt-3">{data.body}</p>
          </div>
        </div>
      </div>
          <div className="min-w-[375px] max-w-[430px] mx-auto fixed bottom-[85px] left-0 right-0">
            <h4 className="font-light bg-[#F0F3F4] mx-[23px] py-3 px-[20px] rounded-full">
              こちらのメッセージに返答はできません
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationDetails;
