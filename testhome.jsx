import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import logo from "/logo.png";
import video from "../../assets/video/banner_video.mp4";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false); // ✅ Handle initial white screen

  const handleNavigation = (path) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate(path);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {" "}
      {/* ✅ Default background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* ✅ Handle Video Load before showing */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill opacity-0 transition-opacity duration-700"
          onLoadedData={() => setVideoLoaded(true)} // ✅ Track when video loads
          style={{ opacity: videoLoaded ? 1 : 0 }} // ✅ Hide until loaded
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* ✅ Gradient overlay for smooth effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </motion.div>
      {/* ✅ Fix Logo Flickering */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={logo}
          alt="main logo"
          className="w-auto h-auto max-w-[80%] md:max-w-[70%] lg:max-w-[60%]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
      {/* ✅ Buttons with smoother animation */}
      <div className="fixed bottom-8 left-0 right-0 flex flex-col gap-3 items-center z-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group"
        >
          <motion.button
            onClick={() => handleNavigation("/socialLogin")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden group"
          >
            <ButtonPrimary
              btnText="始める"
              style="bg-white min-w-[350px] rounded-full text-center py-[15px] lg:py-6 font-bold text-sky-500 shadow-lg hover:shadow-2xl transition-all duration-300"
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group"
        >
          <motion.button
            onClick={() => handleNavigation("/login")}
            className="border-2 border-white min-w-[350px] lg:py-6 text-center py-[15px] font-bold rounded-full font-hiragino text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ログイン
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
