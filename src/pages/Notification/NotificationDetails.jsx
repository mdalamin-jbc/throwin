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
        "システム全体のパフォーマンスを向上させるために、いくつかの重要な改善を行いました。これにより、すべてのユーザーがよりスムーズで効率的な体験を得られるようになりました。",
    },
    {
      id: 2,
      sender: "Throwin公式",
      message: "【お知らせ】新機能を追加しました",
      details:
        "タスクをより効果的に管理できるようにするための新しい機能がシステムに追加されました。この機能は、生産性を向上させ、タスクの整理を簡単にすることを目的としています。",
    },
    {
      id: 3,
      sender: "Throwin公式",
      message: "【お知らせ】不具合を修正しました",
      details:
        "報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。報告された問題を解決するために、いくつかのバグ修正を適用しました。これらの修正により、安定性と信頼性が向上し、スムーズなユーザー体験を提供します。",
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
            <h2 className="font-semibold text-base">{notification.sender}</h2>
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
            <h4 className="font-semibold">{notification.message}</h4>
            <p className="mt-3">{notification.details}</p>
          </div>
        </div>
      </div>
      <div className="min-w-[375px] max-w-[430px] mx-auto fixed bottom-[85px] left-0 right-0">
        <h4 className="font-light bg-[#F0F3F4] mx-[23px] py-3 px-[18px] rounded-full">
          こちらのメッセージに返答はできません
        </h4>
      </div>
    </div>
  );
};

export default NotificationDetails;
