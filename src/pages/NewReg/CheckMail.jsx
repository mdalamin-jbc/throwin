import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import mailImg from "../../assets/icons/mail-icon-3.svg";
import useAxiosPublic from "../../hooks/axiosPublic";
import { motion } from "framer-motion"; // Import Framer Motion

const CheckMail = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  const [isLoading, setIsLoading] = useState(false); // For loading indicator

  const handleResendMail = async () => {
    setIsLoading(true); // Show loading indicator
    try {
      const response = await axiosPublic.post(
        "/auth/register/resend-activation-email",
        { email }
      );

      if (response.status === 200) {
        // Show SweetAlert for success
        Swal.fire({
          title: "成功!",
          text: "アクティベーションメールが正常に再送信されました！",
          icon: "success",
          confirmButtonText: "はい ",
        });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "エラー!",
        text: "このメールアドレスはすでにアクティブ化されています。",
        icon: "error",
        confirmButtonText: "はい",
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center h-screen"
      initial={{ opacity: 0, y: 50 }} // Animation on mount
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }} // Animation on unmount
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="card bg-base-100 w-96 shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="card-body">
          <motion.div
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.img
              className="w-[150px]"
              src={mailImg}
              alt="Mail Icon"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.h3
              className="text-center mt-8 mb-2 font-hiragino font-semibold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              メールを確認してください
            </motion.h3>
            <motion.p
              className="text-center w-[80%] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              メールボックスを確認し、提供されたリンクをクリックしてアカウントをアクティブ化してください。
              メールが届かない場合は、
              <motion.button
                onClick={handleResendMail}
                className="text-[#5297FF] underline ml-1"
                disabled={isLoading} // Disable button while loading
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading
                  ? "再送信中..."
                  : "ここをクリックして再送信してください"}
              </motion.button>
            </motion.p>

            <Link className="mt-6 text-[#5297FF]" to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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

export default CheckMail;
