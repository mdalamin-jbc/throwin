import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import emailLogo from "../../assets/icons/email.png";
import facebookLogo from "../../assets/icons/facebook.png";
import lineLogo from "../../assets/icons/line.png";
import googleLogo from "../../assets/icons/google.png";
import appleLogo from "../../assets/icons/apple.png";
import closeIcon from "../../assets/icons/close.png";

const SocialLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    navigate("/"); // Navigate to the home page or any desired route
  };

  const handleEmail = () => {
    navigate("/emailLogin");
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] "></div>

      <div className="bg-white p-6 rounded-[10px] shadow-xl space-y-6 text-center relative w-[291px] h-[573px] ">
        {/* Logo Image */}
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />
        {/* Adjust the width for the logo */}
        {/* Terms and Conditions Text */}
        <p className="text-gray-600 mb-4 leading-[21px] text-center font-hiragino font-semibold text-[14px] tracking-[0.03em]">
          利用規約に同意して、
          <br />
          SNSアカウントでログイン
        </p>
        {/* Email Registration Button */}
        <button
          onClick={handleEmail}
          className="font-hiragino relative w-[246px] h-[49px] flex items-center justify-center rounded-lg text-white shadow-md"
          style={{ backgroundColor: "#49BBDF" }}
        >
          <img
            src={emailLogo}
            alt="Email"
            className="absolute left-4 w-[22px] h-[22px]"
          />{" "}
          {/* Positioned absolutely */}
          <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
            Eメールで登録
          </span>
        </button>
        {/* Facebook Registration Button */}
        <button
          className="relative w-[246px] h-[49px] flex items-center justify-center rounded-lg text-white shadow-md"
          style={{ backgroundColor: "#086AEF" }}
        >
          <img
            src={facebookLogo}
            alt="Facebook"
            className="absolute left-4 w-[26px] h-[26px]"
          />{" "}
          {/* Positioned absolutely */}
          <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
            Facebook
          </span>
        </button>
        {/* Line Registration Button */}
        <button
          className="relative w-[246px] h-[49px] flex items-center justify-center rounded-lg text-white shadow-md"
          style={{ backgroundColor: "#06C755" }}
        >
          <img
            src={lineLogo}
            alt="Line"
            className="absolute left-4 w-[38px] h-[38px]"
          />{" "}
          {/* Positioned absolutely */}
          <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
            LINE
          </span>
        </button>
        {/* Google Registration Button */}
        <button
          className="relative w-[246px] h-[49px] flex items-center justify-center rounded-lg text-black shadow-md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <img
            src={googleLogo}
            alt="Google"
            className="absolute left-4 w-[26px] h-[26px]"
          />{" "}
          {/* Positioned absolutely */}
          <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
            Google
          </span>
        </button>
        {/* Apple Registration Button */}
        <button
          className="relative w-[245px] h-[49px] flex items-center justify-center rounded-lg text-white shadow-md"
          style={{ backgroundColor: "#000000" }}
        >
          <img
            src={appleLogo}
            alt="Apple"
            className="absolute left-4 w-[26px] h-[26px]"
          />{" "}
          {/* Positioned absolutely */}
          <span className="font-hiragino font-semibold text-[14px] leading-[21px] tracking-[0.03em]">
            Apple
          </span>
        </button>
      </div>

      {/* Close Icon Button Below the Form */}
      <button
        className="mt-4 relative"
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

export default SocialLogin;
