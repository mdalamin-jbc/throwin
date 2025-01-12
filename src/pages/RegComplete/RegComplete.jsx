import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Link } from "react-router-dom";

const RegComplete = () => {
  return (
    <div>
      <TitleBar title={"登録完了"} />

      <motion.h4
        className="mt-[86px] mb-4 font-bold font-hiragino text-[20px] text-center w-full max-w-[430px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        ご登録ありがとうございます！
        <br /> 応援するメンバーを探しましょう！
      </motion.h4>

      <div className="max-w-[430px] mx-auto">
        <motion.div
          className="fixed bottom-[130px] left-[10%] lg:left-[37%] md:left-[29%] transform -translate-x-1/2 w-full max-w-[342px] px-4"
          initial={{ opacity: 0, y: 50 }} // Start from below
          animate={{ opacity: 1, y: 0 }} // Move to its original position
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <Link to={"/search"}>
            <ButtonPrimary
              btnText="メンバーを探す"
              style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-full rounded-full font-hiragino text-center py-[12px] font-bold text-white"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RegComplete;
