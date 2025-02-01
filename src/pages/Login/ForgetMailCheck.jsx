import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import mailImg from "../../assets/icons/mail-icon-3.svg";
import ButtonPrimary from "../../components/ButtonPrimary";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import closeIcon from "../../assets/icons/close.png";

const ForgetMailCheck = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/socialLogin");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen"></div>
      <div>
        <div className="flex  flex-col items-center justify-center h-screen ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="card bg-base-100 w-[291px] mx-auto shadow-xl"
          >
            <div className="card-body">
              <div className="flex flex-col justify-center items-center">
                <motion.img
                  className="w-[150px]"
                  src={mailImg}
                  alt="Mail Icon"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <motion.h3
                  className="text-center mt-8 mb-2 font-hiragino font-semibold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  メールを確認してください
                </motion.h3>
                <motion.p
                  className="text-center w-[80%] mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  メールボックスを確認し、提供されたリンクをクリックしてアカウントをアクティブ化してください。メールが届かない場合は、
                </motion.p>
                <Link className="mt-6 text-[#5297FF]" to="/login">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ButtonPrimary
                      btnText="ログインに戻る"
                      style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full text-center py-[10px] font-bold text-white"
                    />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.button
            className=" p-2 relative mt-14"
            onClick={handleClose}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={closeIcon}
              alt="Close"
              className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgetMailCheck;
