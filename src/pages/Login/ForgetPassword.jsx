import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";

const ForgetPassword = () => {
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
      // API call to request password reset with CSRF token in headers
      const response = await axiosPublic.post(
        "/auth/password/reset-request",
        {
          email: data.mail,
        },
        {
          headers: {
            "X-CSRFTOKEN":
              "FxK7D1PMlrToHLyOS8xXkTp0mJfDZLfGub7UfeaNcPh6j32wUWHYtmksXTazlM0f", // CSRF Token
          },
        }
      );
      console.log(response);
      // Display success message from API response
      Swal.fire({
        title: "成功 ",
        text: "パスワードリセットのリクエストが正常に送信されました！",
        icon: "success",
        confirmButtonText: "はい",
      }).then(() => {
        navigate("/forget_mail_check");
      });
    } catch (error) {
      console.log(error);
      const errorMsg = "エラーが発生しました。後で再試行してください。";
      Swal.fire({
        title: "エラー",
        text: errorMsg,
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

      <div className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[336px]">
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label flex font-bold text-sm">
                <span className="label-text font-Noto">メールアドレス</span>
              </label>
              <input
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
                className="input border rounded-[3px] py-4 mt-1 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.mail && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </div>

            <button type="submit">
              <ButtonPrimary
                btnText="パスワードリセット"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <div className="flex font-hiragino text-xs text-[#626262A6] justify-center gap-2 mt-6 mb-2">
            <button>利用規約</button>
            <p>|</p>
            <button>プライバシーポリシー</button>
          </div>
          <Link
            to="/login"
            className="font-hiragino font-bold text-sm text-[#5297FF]"
          >
            ログイン画面へ
          </Link>
        </div>
      </div>

      <button className="mt-24 p-2 relative" onClick={handleClose}>
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </button>
    </div>
  );
};

export default ForgetPassword;
