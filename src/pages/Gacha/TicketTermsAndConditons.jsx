import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import TitleBar from "../../components/TitleBar";
import { Link, useNavigate } from "react-router-dom";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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
      <div className="max-w-[430px] mx-auto mt-[68px]">
        <img className="flex mx-auto" src={gold_ticket} alt="" />

        <div className="grid text-center ">
          <h2 className="font-bold text-[32px] bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text">
            GOLD TICKET
          </h2>
          <p className="font-bold text-sm bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text">
            居酒屋あ_A店で使用可能
          </p>
        </div>
        <p className="mt-[38px] mb-[38px] max-w-[329px] mx-auto">
          規約例 <br />
          TICKETと交換できる景品については、直接店舗・チームにてご確認ください。
          使用済みのTICKETはいかなる場合も再利用は不可です。必ず店員・スタッフに
          こちらの画面をご提示の上で使用をお願いします。
        </p>

        {/* -------------------------------------- */}
        <div className="text-[#44495B] p-0">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="w-full"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <Link className="" to="/gacha/tickets">
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="TICKETを使用する"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </Link>
          </button>
        </div>
        {/* -------------------------------------- */}
      </div>
    </div>
  );
};

export default TicketTermsAndConditons;
