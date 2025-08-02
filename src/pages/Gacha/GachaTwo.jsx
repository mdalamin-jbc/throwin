import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import UseGetAvailableSpins from "../../hooks/Gacha/UseGetAvailableSpins";
import { Circles } from "react-loader-spinner";

const GachaTwo = () => {
  const navigate = useNavigate();
  const { availableSpins, refetch, isLoading, isError } =
    UseGetAvailableSpins();

  return (
    <div className="mb-[120px]">
      <TitleBar
        style="mb-0 w-full"
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            aria-label="戻る"
          />
        }
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="ロゴ" />}
      />
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Circles
              height="80"
              width="80"
              color="#49BBDF"
              ariaLabel="ローディング中"
              visible
            />
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            ガチャ券の取得に失敗しました
          </p>
        ) : availableSpins.length > 0 ? (
          <motion.div
            className="grid gap-4 max-w-[351px] mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            {availableSpins.map((ticket, index) => (
              <Link to={`ticket/${ticket.store_uid}`} key={ticket.store_uid}>
                <motion.div
                  className="flex justify-between items-center font-bold text-base border border-[#49BBDF] rounded-lg shadow-md px-5 py-4 bg-[#EAF8FD]"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-[#585858]">{ticket.store_name}</h3>
                  <h4 className="flex gap-1 items-center border-l-2 border-[#49BBDF] border-dashed pl-5 text-[#585858]">
                    x
                    <span className="text-2xl font-bold">
                      {ticket.available_spin}
                    </span>
                  </h4>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <p className="text-center mt-8 text-[#585858]">
            利用可能な景品はありません
          </p>
        )}

        <motion.h2
          className="font-bold text-center  text-xl text-[#49BBDF] mt-60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ガチャを回して、 <br /> 景品をゲットしよう！
        </motion.h2>
      </div>
    </div>
  );
};

export default GachaTwo;
