import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import starImg from "../../assets/images/gacha/gold-star.png";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const GotTicket = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="mb-[120px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
        icon={
          <motion.img
            className="w-[110px] items-center"
            src={logo}
            alt="logo"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        }
      />
      <motion.div
        className="max-w-[430px] mx-auto flex-col flex justify-center"
        variants={containerVariants}
      >
        {/* Star Image */}
        <motion.img
          src={starImg}
          className="max-w-[324px] mx-auto"
          alt=""
          variants={itemVariants}
        />

        {/* Gold Ticket Image */}
        <motion.img
          src={gold_ticket}
          className="max-w-[324px] mx-auto"
          alt=""
          variants={itemVariants}
        />

        {/* Text Content */}
        <motion.div className="text-center grid" variants={containerVariants}>
          <motion.p
            className="font-bold text-base bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text"
            variants={textVariants}
          >
            YOU GOT A
          </motion.p>
          <motion.h2
            className="font-bold text-[32px] bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text"
            variants={textVariants}
          >
            GOLD TICKET
          </motion.h2>
          <motion.p
            className="font-bold text-sm bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text"
            variants={textVariants}
          >
            居酒屋あ_A店で使用可能
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mt-5 mb-3 grid gap-3"
          variants={containerVariants}
        >
          <Link to={`ticket-terms`}>
            <motion.div variants={buttonVariants} whileHover="hover">
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="もう一度回す"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </motion.div>
          </Link>
          <Link className="" to={`ticket-terms`}>
            <motion.div variants={buttonVariants} whileHover="hover">
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="このTICKETを使用する"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GotTicket;
