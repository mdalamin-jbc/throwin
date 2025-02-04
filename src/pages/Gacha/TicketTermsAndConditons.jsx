import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import TitleBar from "../../components/TitleBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

import gold from "../../assets/images/gacha/gold-ticket.png";
import bronze from "../../assets/images/gacha/bronze.png";
import silver from "../../assets/images/gacha/silver.png";

const TicketTermsAndConditons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketResponse = location.state?.ticketResponse;

  console.log("Ticket Response:", ticketResponse);

  const ticketImage =
    ticketResponse?.result === "gold"
      ? gold
      : ticketResponse?.result === "silver"
      ? silver
      : bronze;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mb-[120px]"
    >
      <TitleBar
        style="mb-0 w-full"
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            aria-label="Go Back"
          />
        }
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      />
      <div className="max-w-[430px] mx-auto mt-6">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full"
          src={ticketImage}
          alt="Ticket"
        />

        <div className="mt-[38px] mb-[38px] mx-6">
          <p className="font-semibold mb-2">規約例 </p>
          <p className="text-sm text-[#747474]">
            TICKETと交換できる景品については、直接店舗・チームにてご確認ください。
            使用済みのTICKETはいかなる場合も再利用は不可です。必ず店員・スタッフに
            こちらの画面をご提示の上で使用をお願いします。
          </p>
        </div>

        <button
          className="w-full"
          onClick={() => document.getElementById("modal_10").showModal()}
        >
          <div className="text-[#44495B] p-0">
            <button
              className="w-full"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="TICKETを使用する"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-full mx-6 rounded-full text-center py-[10px] font-bold text-white"
              />
            </button>
          </div>
        </button>

        <dialog id="modal_10" className="modal max-w-[343px] mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="modal-box p-0 pt-7"
          >
            <h6 className="text-center font-bold text-[#44495B]">
              TICKETを使用済みにしますか？
            </h6>
            <p className="text-center text-sm text-[#747474] mb-4 mt-2">
              この操作は取り消せません。規約をご確 <br />
              認の上、使用済みにしてください。
            </p>
            <div className="flex justify-center gap-4 border-t-2">
              <form method="dialog">
                <button className="px-4 py-4 border-r-2 border-gray-300 flex items-center justify-center">
                  <span className="">キャンセル</span>
                </button>
              </form>
              <form method="dialog">
                <Link to={"/gacha/tickets"}>
                  <button className="px-4 py-4 text-blue-500 flex items-center justify-center">
                    <span className="">使用済みにする</span>
                  </button>
                </Link>
              </form>
            </div>
          </motion.div>
        </dialog>
      </div>
    </motion.div>
  );
};

export default TicketTermsAndConditons;