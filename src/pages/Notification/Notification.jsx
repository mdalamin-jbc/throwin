import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import TitleBar from "../../components/TitleBar";
import throw_wh from "../../assets/images/home/logo.png";
import { GoDotFill } from "react-icons/go";
import { RiArrowLeftSLine } from "react-icons/ri";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const Notification = () => {
  const navigate = useNavigate();
  const notifications = [
    {
      id: 1,
      sender: "Throwin公式",
      message: "【お知らせ】機能改善を行いました",
      time: "04:04",
      isRead: false,
      details: "We have made some improvements to the system to enhance performance.",
    },
    {
      id: 2,
      sender: "Throwin公式",
      message: "【お知らせ】新機能を追加しました",
      time: "03:30",
      isRead: true,
      details: "A new feature has been added to help you manage your tasks more effectively.",
    },
    {
      id: 3,
      sender: "Throwin公式",
      message: "【お知らせ】不具合を修正しました",
      time: "02:15",
      isRead: false,
      details: "Bug fixes have been applied to resolve reported issues.",
    },
  ];

  return (
    <div className="mb-[120px]">
      <div>
        <TitleBar back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        } title="お気に入り" />
      </div>

      <div className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/myPage/notice/${notification.id}`} 
              className="flex items-center"
            >
              <div className="w-[49px] h-[49px] bg-[#49BBDF] rounded-full flex items-center justify-center">
                <img className="w-[50px]" src={throw_wh} alt={notification.sender} />
              </div>
              <div className="flex-1 flex justify-between">
                <div className="ml-[13px] grid gap-1">
                  <h3 className="font-bold text-sm">{notification.sender}</h3>
                  <p className="font-normal text-sm">{notification.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[#9C9C9C] text-[11.5px]">{notification.time}</p>
                  <GoDotFill
                    className={`text-[20px] ${
                      notification.isRead ? "text-[#D9D9D9]" : "text-[#5B8AE4]"
                    }`}
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
