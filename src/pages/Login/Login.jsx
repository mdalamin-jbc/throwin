import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosPublic from "../../hooks/axiosPublic";
import AuthContext from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import UseUserDetails from "../../hooks/UseUserDetails";
import ButtonSecondary from "../../components/ButtonSecondary";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { userDetails } = UseUserDetails();
  const { login } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validFields, setValidFields] = useState({
    mail: false,
    password: false,
  });

  // Check if user is already logged in
  useEffect(() => {
    if (userDetails?.email) {
      // Show Japanese toast notification for already logged in
      toast.success("すでにログインしています。", {
        position: "top-center",
        duration: 3000,
        id: "already-logged-in",
      });

      // Ask if they want to go to search page
      const confirmRedirect = window.confirm("検索ページに移動しますか？");
      if (confirmRedirect) {
        navigate("/search");
      }
    }
  }, [userDetails?.email, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const watchFields = watch(["mail", "password"]);

  const handleClose = () => {
    navigate("/");
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axiosPublic.post(`/auth/login`, {
        email: data.mail,
        password: data.password,
      });

      if (response.data.msg === "Login Successful") {
        setValidFields({ mail: true, password: true });

        login(response.data.data);
        toast.success("ログインに成功しました。", {
          position: "top-center",
          duration: 1500,
          id: "login-success",
        });

        const res = await axiosPublic.get(`/auth/users/me`, {
          headers: response.data.data.access
            ? {
                Authorization: `Bearer ${response.data.data.access}`,
              }
            : {},
          ...(response.data.data.access && { withCredentials: true }),
        });

        navigate(
          res.data.name === null || res.data.name === "Anonymous user"
            ? "/nickName_reg"
            : "/search"
        );
      } else {
        setError("submit", {
          type: "manual",
          message: response.data.msg,
        });
        setValidFields({ mail: false, password: false });
        toast.error(response.data.msg, {
          position: "top-center",
          duration: 1500,
          id: "login-error",
        });
      }
    } catch (error) {
      setError("submit", {
        type: "manual",
        message: "メールアドレスまたはパスワードが間違っています。",
      });
      setValidFields({ mail: false, password: false });
      toast.error("メールアドレスまたはパスワードが間違っています。", {
        position: "top-center",
        duration: 1500,
        id: "login-error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (fieldName) => {
    const baseStyle =
      "input rounded-[5px] py-4 mt-1 w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 transition-all duration-500 focus:outline-none";

    if (!touchedFields[fieldName]) {
      return `${baseStyle} border-[#D9D9D9] focus:border-[#707070]`;
    }

    if (errors[fieldName]) {
      return `${baseStyle} border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.2),0_0_20px_rgba(255,0,0,0.1),inset_0_0_10px_rgba(255,0,0,0.1)] animate-pulse`;
    }

    if (validFields[fieldName]) {
      return `${baseStyle} border-[#00ff95] shadow-[0_0_10px_rgba(0,255,149,0.2),0_0_20px_rgba(0,255,149,0.1),inset_0_0_10px_rgba(0,255,149,0.1)]`;
    }

    return `${baseStyle} border-[#D9D9D9] focus:border-[#707070]`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen" />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px]"
      >
        <div className="mb-6">
          <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto" />
        </div>

        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="label flex font-bold text-sm">
                <span className="label-text font-Noto">メールアドレス</span>
              </label>
              <div className="relative">
                <input
                  {...register("mail", {
                    required: "メールアドレスを入力してください",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "正しいメールアドレスを入力してください",
                    },
                    onChange: () => {
                      if (errors.submit) {
                        clearErrors("submit");
                      }
                    },
                  })}
                  type="email"
                  placeholder="メールアドレス"
                  className={getInputStyle("mail")}
                />
                <AnimatePresence>
                  {errors.mail && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                      className="absolute left-0 w-full overflow-hidden"
                    >
                      <div className="flex items-center space-x-1 py-1">
                        <svg
                          className="w-3 h-3 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-[11px] text-red-500 font-medium">
                          {errors.mail.message}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mb-6">
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
              <div className="relative">
                <input
                  {...register("password", {
                    required: "パスワードを入力してください",
                    onChange: () => {
                      if (errors.submit) {
                        clearErrors("submit");
                      }
                    },
                  })}
                  type="password"
                  placeholder="パスワード"
                  className={getInputStyle("password")}
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                      className="absolute left-0 w-full overflow-hidden"
                    >
                      <div className="flex items-center space-x-1 py-1">
                        <svg
                          className="w-3 h-3 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-[11px] text-red-500 font-medium">
                          {errors.password.message}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mb-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                
                <ButtonSecondary
                  btnText="ログイン"
                  disabled={isSubmitting}
                  style={`font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full text-center py-[10px] font-bold text-white transition-all duration-500 ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-[0_0_20px_rgba(101,208,242,0.4),0_0_40px_rgba(101,208,242,0.2)]"
                  }`}
                  icon={<FaAngleRight />}
                />
              </motion.button>
            </div>
          </form>

          <Link
            to="/socialLogin"
            className="font-bold mb-3 text-sm text-[#5297FF] font-hiragino transition-all duration-300 hover:text-[#65D0F2] hover:shadow-[0_2px_10px_rgba(101,208,242,0.2)]"
          >
            会員登録がまだの方はこちら
          </Link>
        </div>
      </motion.div>

      <motion.button
        className="mt-6 p-2 relative"
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
    </motion.div>
  );
};

export default Login;
