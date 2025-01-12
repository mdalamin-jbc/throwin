import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";

const GachaTwo = () => {
  const navigate = useNavigate();

  const tickets = [
    { id: 1, name: "居酒屋あ_A店", count: 4 },
    { id: 2, name: "バスケチームB", count: 1 },
    { id: 3, name: "バスケチームD", count: 2 },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3, // Delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
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
      <div>
        <motion.h3
          className="text-center mt-[29px] mb-[18px] font-bold text-xl text-[#585858]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          保有中のガチャ券
        </motion.h3>
        <motion.div
          className="grid gap-[18px] max-w-[351px] mx-auto"
          variants={containerVariants}
        >
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <Link to={`ticket/${ticket.id}`} key={ticket.id}>
                <motion.div
                  className="flex justify-between font-bold text-xl shadow-md px-[21px] py-[30px] bg-white rounded-lg"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <h3 className="text-[#585858]">{ticket.name}</h3>
                  <h4>
                    x<span className="text-[45px]">{ticket.count}</span>
                  </h4>
                </motion.div>
              </Link>
            ))
          ) : (
            <motion.p
              className="text-center text-[#585858]"
              variants={itemVariants}
            >
              No tickets available
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GachaTwo;
