import logo from "../../assets/images/home/logo.png";
import banner1 from "../../assets/images/home/banner1.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleStart = () => {
    navigate("/socialLogin");
  };

  return (
    <div className="relative bg-[#49BBDF] h-screen overflow-auto pt-[70px] md:pt-5">
      {/* Logo */}
      <div className="absolute top-[30px] w-full flex justify-center z-20">
        <img src={logo} alt="logo" />
      </div>

      {/* Title */}
      <div className="absolute top-[150px] lg:top-[120px]  w-full text-white text-center font-bold text-[26px] z-10 ">
        <h2>スローインで</h2>
        <h2>人の願いや夢を応援しよう</h2>
      </div>

      {/* Banner */}
      <div className="absolute top-[310px] md:mt-0 lg:-mt-[130px] w-full flex justify-center z-0">
        <img src={banner1} alt="banner" />
      </div>

      {/* Buttons */}
      <div className="absolute bottom-[40px] lg:-bottom-[60%] xl:bottom-0  w-full flex flex-col gap-3 justify-center items-center z-10">
        <button onClick={handleStart}>
          <ButtonPrimary
            btnText="始める"
            style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[350px] rounded-full text-center py-[10px] lg:py-6 font-bold text-white"
          />
        </button>

        <button
          onClick={handleLogin}
          className=" bg-white min-w-[350px] lg:py-6  text-center py-3 font-bold   rounded-full font-hiragino  text-[#49BBDF] "
        >
          ログイン
        </button>
      </div>
    </div>
  );
};

export default Home;
