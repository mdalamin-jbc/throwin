import logo from "../../assets/images/home/logo.png";
import bg from "../../assets/images/home/bg.png";
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
    <div
      className="relative bg-[#49BBDF] h-screen overflow-auto pt-[70px] md:pt-5 border-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-40 z-10"></div> */}

      {/* Centered Logo */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <img src={logo} alt="logo" className="w-[350px]" />
      </div>

      {/* Buttons */}
      <div className="absolute bottom-[40px] lg:-bottom-[60%] xl:bottom-0 w-full flex flex-col gap-3 justify-center items-center z-20">
        <button onClick={handleStart}>
          <ButtonPrimary
            btnText="始める"
            style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[350px] rounded-full text-center py-[10px] lg:py-6 font-bold text-white"
          />
        </button>

        <button
          onClick={handleLogin}
          className="bg-white min-w-[350px] lg:py-6 text-center py-3 font-bold rounded-full font-hiragino text-[#49BBDF]"
        >
          ログイン
        </button>
      </div>
    </div>
  );
};

export default Home;
