import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosPublic from "../../hooks/axiosPublic";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { login } = useContext(AuthContext);

  const handleClose = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post(`/auth/login`, {
        email: data.mail,
        password: data.password,
      });

      if (response.data.msg === "Login Successful") {
        login(response.data.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: `ログインに成功しました。`,
          showConfirmButton: false,
          timer: 1500,
        });

        const res = await axiosPublic.get(`/auth/users/me`, {
          headers: response.data.data.access
            ? { Authorization: `Bearer ${response.data.data.access}` }
            : {},
          ...(response.data.data.access && { withCredentials: true }),
        });

        if (res.status === 200) {
          if (res.data.name === null || res.data.name === "Anonymous user") {
            navigate("/nickName_reg");
          } else {
            navigate("/search");
          }
        }
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: `${response.data.msg}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: `メールアドレスまたはパスワードが間違っています。`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen"></div>

      <motion.div
        className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[460px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          className="w-[150px] h-auto mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              className="form-control"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="label flex font-bold text-sm">
                <span className="label-text font-Noto">メールアドレス</span>
              </label>
              <motion.input
                {...register("mail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                name="mail"
                type="mail"
                placeholder="メールアドレス"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                whileFocus={{ scale: 1.05 }}
                whileHover={{ scale: 1.02 }}
              />
              {errors.mail && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </motion.div>
            <motion.div
              className="form-control"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="label flex justify-between items-center">
                <span className="label-text font-bold text-sm font-Noto">
                  パスワード
                </span>
                <Link
                  to="/forget_password"
                  className="label-text text-[10px] font-hiragino text-[#5297FF]"
                >
                  パスワードをお忘れですか？
                </Link>
              </label>
              <motion.input
                {...register("password", { required: true })}
                name="password"
                type="password"
                placeholder="パスワード"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
                whileFocus={{ scale: 1.05 }}
                whileHover={{ scale: 1.02 }}
              />
              {errors.password && (
                <span className="text-red-500 my-1 font-Noto">
                  パスワードが必要です
                </span>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonPrimary
                btnText="登録"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full text-center py-[10px] font-bold text-white"
              />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/socialLogin"
              className="font-bold text-sm text-[#5297FF] mt-3 font-hiragino"
            >
              会員登録がまだの方はこちら
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        className="mt-6 p-2 relative"
        onClick={handleClose}
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
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

export default Login;
