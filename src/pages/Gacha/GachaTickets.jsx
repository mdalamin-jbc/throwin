import TitleBar from "../../components/TitleBar";
import logo from "../../assets/images/home/logo.png";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";
import { motion } from "framer-motion";

const GachaTickets = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <TitleBar
        style="mb-0 w-full"
        back={""}
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      ></TitleBar>
      <div className="max-w-[430px] mx-auto mt-[22px]">
        <h4 className="text-center mb-3">景品BOX</h4>
        <div className="max-w-[390px] mx-auto grid grid-cols-2 gap-[18px]">
          {/* Ticket 1 */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
              <img src={gold_ticket} className="max-w-[135px]" alt="Gold Ticket" />
              <h5>居酒屋あ_A店</h5>
            </div>
          </motion.div>
          
          {/* Ticket 2 */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
              <img src={gold_ticket} className="max-w-[135px]" alt="Gold Ticket" />
              <h5>居酒屋あ_A店</h5>
            </div>
          </motion.div>

          {/* Ticket 3 */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
              <img src={gold_ticket} className="max-w-[135px]" alt="Gold Ticket" />
              <h5>居酒屋あ_A店</h5>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GachaTickets;
