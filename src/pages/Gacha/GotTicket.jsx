import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  const handleTickitTerms = () => {
    navigate("ticket-terms", { state: { ticketResponse } });
  };

  // Determine the image based on the ticket response
  const ticketImage =
    ticketResponse?.result === "gold"
      ? gold
      : ticketResponse?.result === "silver"
      ? silver
      : bronze;

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
        {/* Animated ticket image */}
        <motion.img
          src={ticketImage}
          className="w-[calc(100%-20px)] mx-auto"
          alt="Ticket"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.button
          onClick={handleTickitTerms}
          className="mt-5 mb-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ButtonSecondary
            icon={<MdOutlineKeyboardArrowRight />}
            btnText="もう一度回す" // Spin again
            style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
          />
        </motion.button>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link to={`ticket-terms`}>
            <ButtonSecondary
              icon={<MdOutlineKeyboardArrowRight />}
              btnText="このTICKETを使用する" // Use this ticket
              style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GotTicket;
