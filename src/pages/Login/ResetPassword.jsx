import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosReg from "../../hooks/axiosReg";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const axiosReg = useAxiosReg();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleClose = () => {
    navigate("/socialLogin");
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "validate",
          message: "パスワードが一致しません",
        });
        return;
      }

      if (!userId || !token) {
        setErrorMessage("無効なリセットリンクです。");
        return;
      }

      const response = await axiosReg.post(
        `auth/password/reset-confirm/${userId}/${token}`,
        {
          new_password: data.password,
          confirm_password: data.confirmPassword,
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("パスワードが正常にリセットされました！", {
          position: "top-center",
          duration: 4000,
        });
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(
        "パスワードのリセットに失敗しました。もう一度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen overflow-auto bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="fixed inset-0 bg-[#072233fb] min-h-screen overflow-auto"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[490px]"
      >
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}
            <div className="form-control">
              <label className="label font-bold text-sm">
                <span className="label-text font-hiragino">パスワード設定</span>
              </label>
              <input
                {...register("password", {
                  required: "パスワードを入力してください",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上である必要があります",
                  },
                })}
                type="password"
                placeholder="パスワード"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("confirmPassword", {
                  required: "確認用パスワードを入力してください",
                  validate: (value) =>
                    value === password || "パスワードが一致しません",
                })}
                type="password"
                placeholder="パスワード（確認用）"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm my-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              disabled={isSubmitting}
            >
              <ButtonPrimary
                btnText={isSubmitting ? "処理中..." : "リセット"}
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </motion.button>
          </form>
        </div>
      </motion.div>

      <motion.button
        className="mt-8 relative"
        onClick={handleClose}
        whileHover={{ scale: 1.2 }}
        disabled={isSubmitting}
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
