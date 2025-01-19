import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import starImg from "../../assets/images/gacha/gold-star.png";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const GotTicket = () => {
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
      <div className="max-w-[430px] mx-auto flex-col flex justify-center">
        <img src={starImg} className="max-w-[324px] mx-auto" alt="" />
        <img src={gold_ticket} className="max-w-[324px] mx-auto" alt="" />
        <div className="text-center grid">
          <p className="font-bold text-base bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text">
            YOU GOT A
          </p>
          <h2 className="font-bold text-[32px] bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text">
            GOLD TICKET
          </h2>
          <p className="font-bold text-sm bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text">
            居酒屋あ_A店で使用可能
          </p>
        </div>
        <Link className="mt-5 mb-3" to={`ticket-terms`}>
          <ButtonSecondary
            icon={<MdOutlineKeyboardArrowRight />}
            btnText="もう一度回す"
            style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
          />
        </Link>
        <Link to={`ticket-terms`}>
          <ButtonSecondary
            icon={<MdOutlineKeyboardArrowRight />}
            btnText="このTICKETを使用する"
            style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default GotTicket;
