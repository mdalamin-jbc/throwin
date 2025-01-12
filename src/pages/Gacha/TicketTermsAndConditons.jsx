import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import TitleBar from "../../components/TitleBar";
import { Link, useNavigate } from "react-router-dom";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

const TicketTermsAndConditons = () => {
  const navigate = useNavigate();

  // Animation Variants with 1-second duration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
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
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      />
      <div className="max-w-[430px] mx-auto mt-[68px]">
        {/* Gold Ticket Image */}
        <motion.img
          className="flex mx-auto"
          src={gold_ticket}
          alt=""
          variants={itemVariants}
        />

        <div className="grid text-center">
          {/* Title */}
          <motion.h2
            className="font-bold text-[32px] bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text"
            variants={textVariants}
          >
            GOLD TICKET
          </motion.h2>
          {/* Subtext */}
          <motion.p
            className="font-bold text-sm bg-gradient-to-r from-[#EEBA4C]  to-[#886A2B] inline-block text-transparent bg-clip-text"
            variants={textVariants}
          >
            居酒屋あ_A店で使用可能
          </motion.p>
        </div>

        {/* Terms Text */}
        <motion.p
          className="mt-[38px] mb-[38px] max-w-[329px] mx-auto"
          variants={textVariants}
        >
          規約例 <br />
          TICKETと交換できる景品については、直接店舗・チームにてご確認ください。
          使用済みのTICKETはいかなる場合も再利用は不可です。必ず店員・スタッフに
          こちらの画面をご提示の上で使用をお願いします。
        </motion.p>

        {/* Button to Open Modal */}
        <div className="text-[#44495B] p-0">
          <button
            className="w-full"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <Link className="" to="/gacha/tickets">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
              >
                <ButtonSecondary
                  icon={<MdOutlineKeyboardArrowRight />}
                  btnText="TICKETを使用する"
                  style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
                />
              </motion.div>
            </Link>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketTermsAndConditons;
