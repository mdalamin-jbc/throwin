import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import TitleBar from "../../components/TitleBar";
import throw_wh from "../../assets/images/home/logo.png";
import { GoDotFill } from "react-icons/go";
import { RiArrowLeftSLine } from "react-icons/ri";

import UseGetNotifications from "../../hooks/UseGetNotifications";
import { Circles } from "react-loader-spinner";

const Notification = () => {
  const navigate = useNavigate();
  const { notifications, refetch, isLoading, isError } = UseGetNotifications();
  const notice = notifications?.results;
  console.log(notice);

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
        <div className="mb-[120px]">
          <div>
            <TitleBar
              back={
                <RiArrowLeftSLine
                  onClick={() => navigate(-1)}
                  style={{ cursor: "pointer" }}
                />
              }
              title="お気に入り"
            ></TitleBar>
          </div>
          <div className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5">
            {notice?.map((notification) => (
              <Link
                key={notification.uid}
                to={`/myPage/notice/${notification.uid}`}
                className="flex items-center"
              >
                <div className="w-[49px] h-[49px] bg-[#49BBDF] rounded-full flex items-center justify-center">
                  <img
                    className="w-[50px]"
                    src={throw_wh}
                    alt={notification.sender}
                  />
                </div>
                <div className="flex-1 flex justify-between">
                  <div className="ml-[13px] grid gap-1">
                    <h3 className="font-bold text-sm">Throwin公式</h3>
                    <p className="font-normal text-sm">{notification.title}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-[#9C9C9C] text-[11.5px]">
                      {new Date(notification.created_at).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit", hour12: false }
                      )}
                    </p>
                    <GoDotFill
                      className={`text-[20px] ${
                        notification.is_read
                          ? "text-[#D9D9D9]"
                          : "text-[#5B8AE4]"
                      }`}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
