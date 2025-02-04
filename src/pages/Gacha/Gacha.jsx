import { motion } from "framer-motion";
import ButtonSecondary from "../../components/ButtonSecondary";
import TitleBar from "../../components/TitleBar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/images/home/logo.png";
import banner from "../../assets/images/gacha/gacha_banner.png";
import { Link } from "react-router-dom";

const Gacha = () => {
  return (
    <div className="mb-[120px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TitleBar
          style="mb-0 w-full"
          back={""}
          title=""
          icon={
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-[110px] items-center"
              src={logo}
              alt="logo"
            />
          }
        ></TitleBar>
        <div className="max-w-[430px] text-center mx-auto">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
            src={banner}
            alt=""
          />
        </div>
        <div className="mt-[11px] max-w-[430px] mx-auto text-center">
          <Link to="available_spins">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="使用するガチャ券を選ぶ"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </motion.div>
          </Link>
          <motion.h5
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-[11px] underline font-semibold text-[#434343]"
          >
            TICKET BOXを見る
          </motion.h5>
        </div>
      </motion.div>
    </div>
  );
};

export default Gacha;