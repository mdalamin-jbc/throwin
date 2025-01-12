import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { Helmet } from "react-helmet";
import UseUserDetails from "../../hooks/UseUserDetails";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import { motion } from "framer-motion"; // Import Framer Motion

const ChangePassword = () => {
  const { userDetails } = UseUserDetails();
  const [isNextStep, setIsNextStep] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!isNextStep) {
      setIsNextStep(true); // Go to next step
    } else {
      try {
        // Make the PATCH request to change the password
        const response = await axiosPrivate.patch("/auth/password/change", {
          old_password: data.current_pass,
          new_password: data.password,
          confirm_password: data.confirmPassword,
        });
        console.log(response);
        // Show SweetAlert success notification
        Swal.fire({
          icon: "success",
          title: "パスワードが正常に変更されました",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/myPage");
      } catch (error) {
        // Handle error feedback
        console.error(
          "Error changing password:",
          error.response?.data || error.message
        );

        // Show SweetAlert error notification
        Swal.fire({
          icon: "error",
          title: "パスワードの変更に失敗しました",
          text: "再試行してください",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Helmet>
        <title>Throwin | Change Password</title>
      </Helmet>
      <TitleBar
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        }
        title={"マイページ"}
      />
      <div className="w-full max-w-[430px] mx-auto">
        <motion.h3
          className="text-center font-hiragino font-bold text-lg text-[#44495B] mt-[59px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          パスワードの変更
        </motion.h3>
        <p className="my-[22px] text-center text-[#9F9999] text-sm font-semibold">
          {userDetails.email}
        </p>

        <div className="flex flex-col justify-center">
          <motion.form
            className="flex flex-col w-[342px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {!isNextStep ? (
              <motion.div
                className="form-control"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <input
                  {...register("current_pass", {
                    required: "Current password is required",
                  })}
                  name="current_pass"
                  type="password"
                  placeholder="現在のパスワード"
                  className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                />
                {errors.current_pass && (
                  <motion.span
                    className="text-red-500 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.current_pass.message}
                  </motion.span>
                )}
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="form-control"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <input
                    {...register("password", {
                      required: "新しいパスワードを入力してください",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    name="password"
                    type="password"
                    placeholder="新しいパスワードを入力してください"
                    className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                  />
                  {errors.password && (
                    <motion.span
                      className="text-red-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.password.message}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div
                  className="form-control"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <input
                    {...register("confirmPassword", {
                      required: "新しいパスワードを入力してください（確認用）",
                      validate: (value) =>
                        value ===
                          document.querySelector("input[name='password']")
                            .value || "パスワードが一致しません",
                    })}
                    name="confirmPassword"
                    type="password"
                    placeholder="新しいパスワードを入力してください（確認用）"
                    className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                  />
                  {errors.confirmPassword && (
                    <motion.span
                      className="text-red-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.confirmPassword.message}
                    </motion.span>
                  )}
                </motion.div>
              </>
            )}

            <motion.button
              className="fixed bottom-[130px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              type="submit"
            >
              <ButtonPrimary
                btnText={isNextStep ? "保存" : "次へ"}
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
              />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangePassword;
