import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import mailImg from "../../assets/icons/mail-icon-3.svg";

const ForgetMailCheck = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="card bg-base-100 w-96 shadow-xl"
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
                className="px-4 py-2 bg-[#5297FF] text-white rounded-lg shadow-md"
              >
                <p>ログインに戻る</p>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetMailCheck;
