import { RiArrowLeftSLine } from "react-icons/ri";
import TitleBar from "../../components/TitleBar";
import logo from "../../assets/logo/logo4.png";
import { useNavigate, useParams } from "react-router-dom";

const NotificationDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the notification ID from the route

  const notifications = [
    {
      id: 1,
      sender: "Throwin公式",
      message: "【お知らせ】機能改善を行いました",
      details:
        "We have made some improvements to the system to enhance performance.",
    },
    {
      id: 2,
      sender: "Throwin公式",
      message: "【お知らせ】新機能を追加しました",
      details:
        "A new feature has been added to help you manage your tasks more effectively.",
    },
    {
      id: 3,
      sender: "Throwin公式",
      message: "【お知らせ】不具合を修正しました",
      details: "Bug fixes have been applied to resolve reported issues.",
    },
  ];

  // Find the notification by ID
  const notification = notifications.find((notif) => notif.id === parseInt(id));

  if (!notification) {
    return <p>Notification not found</p>;
  }
  console.log(notification);
  return (
    <div>
      <div>
        <TitleBar back={null} icon={null} title="お気に入り"></TitleBar>
      </div>
      <div className="min-w-[375px] max-w-[430px] mx-auto  mt-3 text-[#44495B] ">
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
            <h2 className="font-semibold text-base">{notification.sender}</h2>
          </div>
          <div></div>
        </div>
        <div className="mt-3 px-[23px] flex gap-2  ">
          <div className="">
            <div className="bg-[#49BBDF] w-[40px] h-[40px] flex justify-center items-center rounded-full">
              <img src={logo} alt="" className="" />
            </div>
          </div>
          <div className="bg-[#F0F3F4] py-4 px-[18px]">
            <h4>{notification.message}</h4>
            <p>{notification.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
