import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import img from "../../assets/images/gacha/vending_1.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import UseGetAvailableSpins from "../../hooks/Gacha/UseGetAvailableSpins";
import { Circles } from "react-loader-spinner";
import useAxiosPrivate from "../../hooks/axiousPrivate";

const UseTicket = () => {
  const { store_uid } = useParams();
  const { availableSpins, refetch, isLoading, isError } =
    UseGetAvailableSpins();
  const location = useLocation();
  const navigate = useNavigate();
  const ticketResponse = location.state?.ticketResponse;
  const axiosPrivate = useAxiosPrivate();

  const ticket = availableSpins.find((spin) => spin.store_uid === store_uid);

  const handlePlayGacha = async () => {
    try {
      const response = await axiosPrivate.post("/gacha/play", { store_uid });
      refetch();
      navigate("processing", { state: { ticketResponse: response.data } });
    } catch (error) {
      console.error("Error playing gacha:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible
        />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to fetch data</p>;
  }

  if (!ticket) {
    return <p className="text-center">Ticket not found</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mb-[120px]"
    >
      <TitleBar
        style="mb-0 w-full"
        back={
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <RiArrowLeftSLine
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
              aria-label="Go Back"
            />
          </motion.div>
        }
        title=""
        icon={
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-[110px] items-center"
            src={logo}
            alt="logo"
          />
        }
      />
      <div className="max-w-[430px] mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img src={img} alt="Gacha Machine" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mx-8"
        >
          <div className="flex justify-between items-center font-bold text-base border border-[#49BBDF] rounded-lg shadow-md px-5 py-4 bg-[#EAF8FD]">
            <h3 className="text-[#585858]">{ticket.store_name}</h3>
            <h4 className="flex gap-1 items-center border-l-2 border-[#49BBDF] border-dashed pl-5 text-[#585858]">
              x
              <span className="text-2xl font-bold">
                {ticket.available_spin}
              </span>
            </h4>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-[43px] relative"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-5 w-[240px] rounded text-center">
            <h4 className="w-full text-[#36ABE0] relative rounded-full bg-white p-[2px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#3BAFE0] to-[#209AE1] rounded-full"></span>
              <span className="relative block bg-white rounded-full px-4">
                ガチャ券を1枚使って
              </span>
            </h4>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
            onClick={handlePlayGacha}
          >
            <ButtonSecondary
              icon={<MdOutlineKeyboardArrowRight />}
              btnText="回す！"
              style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UseTicket;
