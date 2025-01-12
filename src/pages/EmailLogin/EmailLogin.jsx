import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";
import { motion } from "framer-motion"; // Import motion

const EmailLogin = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleClose = () => {
    navigate("/socialLogin");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post("/auth/register/check-email", {
        email: data.mail,
      });
      console.log(response);
      navigate("/new_reg", { state: { email: data.mail } });
    } catch (error) {
      const errorMsg =
        error.response?.data?.email?.[0] ||
        "エラーが発生しました。後で再試行してください。";
      console.log(errorMsg);
      Swal.fire({
        title: "エラー",
        text: "すでにアカウントがあります。アカウントをアクティベートしてください。",
        icon: "error",
        confirmButtonText: "はい",
      });
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen"></div>

      {/* Animated Form Container */}
      <motion.div
        className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[336px]"
        initial={{ opacity: 0, scale: 0.9 }} // Initial animation state
        animate={{ opacity: 1, scale: 1 }}  // Final animation state
        transition={{ duration: 0.8 }}      // Transition duration
      >
        {/* Animated Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          className="w-[150px] h-auto mx-auto mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <motion.label
                className="label flex font-bold text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="label-text font-Noto">メールアドレス</span>
              </motion.label>
              <motion.input
                {...register("mail", {
                  required: "メールアドレスは必須です。",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "無効なメール形式です。",
                  },
                })}
                name="mail"
                type="text"
                placeholder="メールアドレス"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              />

              {errors.mail && (
                <motion.span
                  className="text-red-500 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {errors.mail.message}
                </motion.span>
              )}
            </div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <ButtonPrimary
                btnText="新規登録"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </motion.button>
          </form>

          <motion.div
            className="flex font-hiragino text-xs text-[#626262A6] justify-center gap-2 mt-6 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <button>
              <Link to="/terms">利用規約</Link>
            </button>
            <p>|</p>
            <button>プライバシーポリシー</button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              to="/login"
              className="font-hiragino font-bold text-sm text-[#5297FF]"
            >
              ログイン画面へ
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Close Button */}
      <motion.button
        className="mt-24 p-2 relative"
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </motion.button>
    </div>
  );
};

export default EmailLogin;
