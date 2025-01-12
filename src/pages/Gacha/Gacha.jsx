import { motion } from "framer-motion";
import ButtonSecondary from "../../components/ButtonSecondary";
import TitleBar from "../../components/TitleBar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/images/home/logo.png";
import { Link } from "react-router-dom";

const Gacha = () => {
  return (
    <motion.div
      className="mb-[120px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <TitleBar
          style="mb-0 w-full"
          back={""}
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
          className="max-w-[430px] text-center mx-auto bg-[#D9D9D9] mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="max-w-[279px] mx-auto font-bold text-[#585858] text-[25px] pt-[87px]">
            ガチャの説明用バナー <br />
            ・店舗(チーム)別に得たガチャ券を使えること
            <br />
            ・景品は金銀銅チケッ <br />
            トの3種類
            <br />
            ・チケットと交換できるものは店舗（チーム）に聞いてね
          </h4>
          <motion.p
            className="font-semibold text-[#000000] pb-[14px] mt-[86px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            提供割合
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-[11px] max-w-[430px] mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/gacha2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonSecondary
                icon={<MdOutlineKeyboardArrowRight />}
                btnText="使用するガチャ券を選ぶ"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
              />
            </motion.div>
          </Link>
          <motion.h5
            className="mt-[11px] underline font-semibold text-[#434343]"
            whileHover={{ color: "#2399F4" }}
            transition={{ duration: 0.3 }}
          >
            ゲットしたTICKET一覧
          </motion.h5>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gacha;
