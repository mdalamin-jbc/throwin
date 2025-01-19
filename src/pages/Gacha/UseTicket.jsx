import { useParams, useNavigate, Link } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import img from "../../assets/images/gacha/gachaImg1.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const UseTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Dummy ticket data for demonstration.
  const ticket = { id: ticketId, name: "Sample Ticket", count: 3 };

  if (!ticket) {
    return <p>Ticket not found</p>;
  }

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
      <div className="max-w-[430px] mx-auto ">
        <div className="flex justify-center">
          <img src={img} alt="" />
        </div>
        <div className=" max-w-[351px] mx-auto">
          <div className="flex justify-between font-bold text-xl shadow-md px-[21px] py-[30px] mt-[15px]">
            <h3 className="text-[#585858]">居酒屋あ_A店</h3>
            <h4>
              x<span className="text-[45px]">4</span>
            </h4>
          </div>
        </div>
        <div className="mt-[43px] relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-5 w-[240px] bg-white rounded text-center">
            <h4 className="w-full text-[#585858] border">
              ガチャ券を1枚使って
            </h4>
          </div>
          <Link to={`processing`}>
            <ButtonSecondary
              icon={<MdOutlineKeyboardArrowRight />}
              btnText="回す！"
              style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UseTicket;
