import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";

const Password = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    navigate("/socialLogin"); // Navigate to the home page or any desired route
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] "></div>

      <div className="bg-white p-6 rounded-[10px] shadow-xl  text-center relative w-[291px] h-[460px] ">
        {/* Logo Image */}
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        {/* email input */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label font-bold text-sm">
                <span className="label-text font-hiragino">パスワード設定</span>
              </label>
              <input
                {...register("email", { required: true })}
                name="email"
                type="text"
                placeholder="パスワード"
                className="input border rounded-[3px] py-4 mt-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.name && (
                <span className="text-red-500 mt-1">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("mail", { required: true })}
                name="mail"
                type="text"
                placeholder="パスワード（確認用）"
                className="input border rounded-[3px] py-4  mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.mail && (
                <span className="text-red-500 my-1">Email is required</span>
              )}
            </div>

            <button>
              <ButtonPrimary
                btnText="登録"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <div className=" mt-11 grid gap-4 font-hiragino font-light text-[10px] text-start text-[#6B6969]">
            <p className="">ご利用情報がSNSに公開されることはありません。</p>
            <p className="">
              複数アカウントの作成、保有、または利用する行為は
              禁止されており、会員アカウントを停止・永久凍結も
              しくは強制退化させていただきます。
            </p>
          </div>
        </div>
      </div>

      {/* Close Icon Button Below the Form */}
      <button
        className="mt-8 relative"
        onClick={handleClose} // Call handleClose on click
      >
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700" // Apply your desired styles here
        />
      </button>
    </div>
  );
};

export default Password;
