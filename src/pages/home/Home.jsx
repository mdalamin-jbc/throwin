import logo from "../../assets/images/home/logo.png";
import logo1 from "../../assets/logo/home_logo.png";
import logo2 from "../../assets/logo/home_logo_part_2.png";
import video from "../../assets/video/banner_video.mp4";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleStart = () => {
    navigate("/socialLogin");
  };

  return (
    <div className="relative bg-[#49BBDF] h-screen overflow-hidden pt-[70px] md:pt-5 border-white">
      <video
        src={video}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      ></video>

      {/* Centered Logo */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img src={logo} alt="logo" className="w-[350px]" />
        {/* <div>
          <img src={logo2} alt="logo" className="absolute" />
          <img src={logo1} alt="logo" className="relative " />
        </div> */}
      </motion.div>

      {/* Buttons */}
      <div className="absolute bottom-[40px] lg:-bottom-[60%] xl:bottom-0 w-full flex flex-col gap-3 justify-center items-center z-20">
        <motion.button
          onClick={handleStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ButtonPrimary
            btnText="始める"
            style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[350px] rounded-full text-center py-[10px] lg:py-6 font-bold text-white"
          />
        </motion.button>

        <motion.button
          onClick={handleLogin}
          className="bg-white min-w-[350px] lg:py-6 text-center py-3 font-bold rounded-full font-hiragino text-[#49BBDF]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          ログイン
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
