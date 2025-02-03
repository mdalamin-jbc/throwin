import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import TitleBar from "../../components/TitleBar";
import { Link, useNavigate } from "react-router-dom";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";

const TicketTermsAndConditons = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-[120px]">
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
        <img className="w-full" src={gold_ticket} alt="" />

        <p className="mt-[38px] mb-[38px] max-w-[329px] mx-auto">
          規約例 <br />
          TICKETと交換できる景品については、直接店舗・チームにてご確認ください。
          使用済みのTICKETはいかなる場合も再利用は不可です。必ず店員・スタッフに
          こちらの画面をご提示の上で使用をお願いします。
        </p>

        {/* -------------------------------------- */}
        <button
          className="w-full"
          onClick={() => document.getElementById("modal_10").showModal()}
        >
          <div className="text-[#44495B] p-0">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="w-full"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="TICKETを使用する"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </button>
          </div>
        </button>

        <dialog id="modal_10" className="modal max-w-[343px] mx-auto ">
          <div className="modal-box p-0 pt-7">
            {" "}
            <h6 className="text-center font-bold text-[#44495B]">
              TICKETを使用済みにしますか？
            </h6>
            <p className="text-center text-sm text-[#747474]  mb-4  mt-2">
              この操作は取り消せません。規約をご確 <br />
              認の上、使用済みにしてください。
            </p>
            <div className="flex justify-center gap-4 border-t-2">
              <form method="dialog">
                <button className="px-4 py-4  border-r-2 border-gray-300 flex items-center justify-center">
                  <span className="">キャンセル</span>{" "}
                </button>
              </form>
              <form method="dialog">
                <Link to={"/gacha/tickets"}>
                  <button className="px-4 py-4 text-blue-500 flex items-center justify-center">
                    <span className="">使用済みにする</span>{" "}
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TicketTermsAndConditons;
