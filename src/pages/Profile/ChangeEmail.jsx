import { useForm } from "react-hook-form";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import UseUserDetails from "../../hooks/UseUserDetails";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // Import motion

const ChangeEmail = () => {
  const { userDetails } = UseUserDetails();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, email: new_email } = data;
    try {
      const response = await axiosPrivate.post(
        `auth/users/email-change-request`,
        { password, new_email }
      );
      console.log(response);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "成功 !",
        text: "確認メールが送信されました。",
        confirmButtonText: "はい",
      });

      reset();
    } catch (error) {
      console.log(error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "おっと。。。",
        text: "何かがうまくいきませんでした。もう一度お試しください。",
        confirmButtonText: "はい",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation on mount
      exit={{ opacity: 0, y: 50 }} // Animation on unmount
      transition={{ duration: 0.8 }}
    >
      <TitleBar
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        }
        title={"マイページ"}
      />
      <div className="w-full max-w-[380px] mx-auto">
        {/* Title Animation */}
        <motion.h3
          className="text-center font-hiragino font-bold text-lg text-[#44495B] mt-[59px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          メールアドレスの変更
        </motion.h3>

        {/* Subtitle Animation */}
        <motion.p
          className="my-[22px] text-center text-[#9F9999] text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          現在のアドレス：{userDetails.email}
        </motion.p>

        {/* Form Animation */}
        <motion.form
          className="flex flex-col w-[342px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="form-control">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <motion.input
              {...register("password", { required: "Password is required" })}
              id="password"
              name="password"
              type="password"
              placeholder="パスワードを入力してください"
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            {errors.password && (
              <motion.span
                className="text-red-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.password.message}
              </motion.span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="email" className="sr-only">
              New Email
            </label>
            <motion.input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              id="email"
              name="email"
              type="email"
              placeholder="新しいメールアドレスを入力してください"
              className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            {errors.email && (
              <motion.span
                className="text-red-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.email.message}
              </motion.span>
            )}
          </div>

          {/* Button Animation */}
          <motion.button
            type="submit"
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ButtonPrimary
              btnText="認証メールを送る"
              style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
            />
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ChangeEmail;
