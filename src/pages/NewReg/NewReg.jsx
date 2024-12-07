import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosReg from "../../hooks/axiosReg";
import { useState } from "react";

const NewReg = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosReg = useAxiosReg();

  const { email } = location.state || {};
  console.log("Email from state:", email);

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
      email,
      password: data.password,
      confirm_password: data.confirmPassword,
    };
  
    console.log("Request data:", requestData);
  
    try {
      const response = await axiosReg.post(
        "/auth/register/consumer",
        requestData
      );
      console.log("Response data:", response.data);
  
      if (
        response.data.msg ===
        "User Created Successfully, Please check your email to activate your account in 48 hours."
      ) {
        // Passing the email to the mail_check page
        navigate("/mail_check", { state: { email: email } });
      } else {
        setErrorMessage("登録に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      if (error.response && error.response.data.password) {
        console.log(
          "Password validation errors:",
          error.response.data.password
        );
        setError("password", {
          type: "manual",
          message: error.response.data.password.join(" "),
        });
      } else {
        setErrorMessage(
          error.response ? error.response.data.msg : "エラーが発生しました。"
        );
      }
      console.error("Registration error:", error);
    }
  };
  

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen overflow-auto bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="fixed inset-0 bg-[#072233fb] min-h-screen overflow-auto"></div>

      <div
        className={`bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] ${
          errors.password ? "h-[545px]" : "h-[490px]"
        }`}
      >
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* General error message */}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}

            <div className="form-control">
              <label className="label font-bold text-sm">
                <span className="label-text font-hiragino">パスワード設定</span>
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="パスワード"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              />
              {errors.password && (
                <span className="text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("confirmPassword", {
                  required: "Confirmation is required",
                  validate: (value) =>
                    value === password || "パスワードが一致しません",
                })}
                type="password"
                placeholder="パスワード（確認用）"
                className="input rounded-[5px] py-4 mt-1 mb-[9px] w-full pl-4 font-Noto text-[#44495B80] text-sm border-2 border-[#D9D9D9] focus:border-[#707070] focus:outline-none"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 my-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button>
              <ButtonPrimary
                btnText="登録"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <div className="mt-11 grid gap-4 font-hiragino font-light text-[10px] text-start text-[#6B6969]">
            <p>ご利用情報がSNSに公開されることはありません。</p>
            <p>
              複数アカウントの作成、保有、または利用する行為は
              禁止されており、会員アカウントを停止・永久凍結も
              しくは強制退化させていただきます。
            </p>
          </div>
        </div>
      </div>

      <button className="mt-8 relative" onClick={handleClose}>
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </button>
    </div>
  );
};

export default NewReg;
