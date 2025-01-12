import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosReg from "../../hooks/axiosReg";
import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const axiosReg = useAxiosReg();

  const handleClose = () => {
    navigate("/socialLogin");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    const requestData = {
      new_password: data.password,
      confirm_password: data.confirmPassword,
    };

    try {
      const response = await axiosReg.post(
        `/auth/password/reset-confirm/${userId}/${token}`,
        requestData
      );

      if (response.data.detail === "Password reset successful") {
        Swal.fire({
          icon: "success",
          title: "成功",
          text: "パスワードが正常にリセットされました！",
          confirmButtonText: "はい ",
        }).then(() => {
          navigate("/login");
        });
      } else {
        setErrorMessage(
          "パスワードのリセットに失敗しました。もう一度お試しください。"
        );
      }
    } catch (error) {
      if (error.response && error.response.data.new_password) {
        setError("password", {
          type: "manual",
          message: error.response.data.new_password.join(" "),
        });
      } else {
        setErrorMessage(
          error.response ? error.response.data.detail : "エラーが発生しました。"
        );
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen overflow-auto bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="fixed inset-0 bg-[#072233fb] min-h-screen overflow-auto"></div>

      <motion.div
        className={`bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] ${
          errors.password ? "h-[545px]" : "h-[490px]"
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          className="w-[150px] h-auto mx-auto mb-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <motion.div
                className="text-red-500 text-sm mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {errorMessage}
              </motion.div>
            )}

            <motion.div
              className="form-control"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="label font-bold text-sm">
                <span className="label-text font-hiragino">パスワード設定</span>
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="パスワード"
                className="input border rounded-[3px] py-4 mt-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.password && (
                <span className="text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </motion.div>

            <motion.div
              className="form-control"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <input
                {...register("confirmPassword", {
                  required: "Confirmation is required",
                  validate: (value) =>
                    value === password || "パスワードが一致しません",
                })}
                type="password"
                placeholder="パスワード（確認用）"
                className="input border rounded-[3px] py-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 my-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonPrimary
                btnText="リセット"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </motion.button>
          </form>

          <motion.div
            className="mt-11 grid gap-4 font-hiragino font-light text-[10px] text-start text-[#6B6969]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p>ご利用情報がSNSに公開されることはありません。</p>
            <p>
              複数アカウントの作成、保有、または利用する行為は
              禁止されており、会員アカウントを停止・永久凍結も
              しくは強制退化させていただきます。
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        className="mt-8 relative"
        onClick={handleClose}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.4 }}
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

export default ResetPassword;
