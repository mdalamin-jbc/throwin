import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import logo from "../../assets/images/home/logo.png";
import gold from "../../assets/images/gacha/lation_gold_card.png";
import silver from "../../assets/images/gacha/lation_silver_card.png";
import bronze from "../../assets/images/gacha/lation_bronze_card.png";
import UseGetSpins from "../../hooks/Gacha/UseGetSpins";
import { Circles } from "react-loader-spinner";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const GachaTickets = () => {
  const { tickets, isLoading, isError } = UseGetSpins();

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-[120px]"
    >
      <TitleBar
        style="mb-0 w-full"
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        }
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      />
      <div className="max-w-[430px] mx-auto mt-[22px]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-[10px]"
        >
          <h4 className="text-center mb-3">チケットボックス</h4>

          {isLoading ? (
            <div className="flex justify-center items-center h-[80vh]">
              <Circles
                height="80"
                width="80"
                color="#49BBDF"
                ariaLabel="circles-loading"
                visible
              />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">
              チケットの読み込みに失敗しました。もう一度お試しください。
            </p>
          ) : tickets?.length === 0 ? (
            <p className="text-center text-gray-500">
              利用可能なチケットがありません。
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-[390px] mx-auto grid grid-cols-2 gap-[18px]"
            >
              {tickets?.map((ticket) => {
                const ticketImage =
                  ticket.gacha_kind === "gold"
                    ? gold
                    : ticket.gacha_kind === "silver"
                    ? silver
                    : bronze;

                return (
                  <motion.div
                    key={ticket.uid}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center"
                  >
                    <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
                      <img
                        src={ticketImage}
                        className="w-[calc(100%-20px)]"
                        alt="チケット"
                      />
                      <h5 className="-mt-3 text-[#434343]">
                        {ticket?.store_name}
                      </h5>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GachaTickets;
