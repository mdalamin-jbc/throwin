import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
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
      <div className="max-w-[430px] mx-auto flex-col flex justify-center mt-6">
        <img src={gold_ticket} className="" alt="" />

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
