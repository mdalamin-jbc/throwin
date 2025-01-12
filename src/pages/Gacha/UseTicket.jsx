import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  const ticket = { id: ticketId, name: "居酒屋あ_A店", count: 4 };

  if (!ticket) {
    return <p>Ticket not found</p>;
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        className="max-w-[430px] mx-auto"
        variants={containerVariants}
      >
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <img src={img} alt="" />
        </motion.div>
        <motion.div
          className="max-w-[351px] mx-auto"
          variants={itemVariants}
        >
          <div className="flex justify-between font-bold text-xl shadow-md px-[21px] py-[30px] mt-[15px]">
            <h3 className="text-[#585858]">{ticket.name}</h3>
            <h4>
              x<span className="text-[45px]">{ticket.count}</span>
            </h4>
          </div>
        </motion.div>
        <motion.div
          className="mt-[43px] relative"
          variants={itemVariants}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-5 w-[240px] bg-white rounded text-center">
            <h4 className="w-full text-[#585858] border">
              ガチャ券を1枚使って
            </h4>
          </div>
          <Link to={`processing`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="回す！"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UseTicket;
