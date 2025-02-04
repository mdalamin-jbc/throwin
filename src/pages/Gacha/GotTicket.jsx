import { Link, useLocation, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import gold from "../../assets/images/gacha/gold-ticket.png";
import bronze from "../../assets/images/gacha/bronze.png";
import silver from "../../assets/images/gacha/silver.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const GotTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketResponse = location.state?.ticketResponse;

  console.log("Ticket Response:", ticketResponse);

  // Determine the image based on the ticket response
  const ticketImage =
    ticketResponse === "gold"
      ? gold
      : ticketResponse === "silver"
      ? silver
      : bronze; // Default to bronze if the response is unknown

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
        {/* Show the ticket image dynamically */}
        <img
          src={ticketImage}
          className="w-[calc(100%-20px)] mx-auto"
          alt="Ticket"
        />

        <Link className="mt-5 mb-3" to={`/use-ticket`}>
          <ButtonSecondary
            icon={<MdOutlineKeyboardArrowRight />}
            btnText="もう一度回す" // Spin again
            style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
          />
        </Link>
        <Link to={`/ticket-terms`}>
          <ButtonSecondary
            icon={<MdOutlineKeyboardArrowRight />}
            btnText="このTICKETを使用する" // Use this ticket
            style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default GotTicket;
