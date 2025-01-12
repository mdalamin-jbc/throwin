import { Link } from "react-router-dom";
import mailImg from "../../assets/icons/mail-icon-3.svg";
import { motion } from "framer-motion";

const ForgetMailCheck = () => {
  return (
    <motion.div
      className="flex items-center justify-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="card bg-base-100 w-96 shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="card-body">
          <motion.div
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              className="w-[150px]"
              src={mailImg}
              alt="Mail Icon"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <h3 className="text-center mt-8 mb-2 font-hiragino font-semibold text-lg">
              メールを確認してください
            </h3>
            <p className="text-center w-[80%] mx-auto">
              メールボックスを確認し、提供されたリンクをクリックしてアカウントをアクティブ化してください。メールが届かない場合は、
            </p>

            <Link className="mt-6 text-[#5297FF]" to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <p>ログインに戻る</p>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgetMailCheck;
