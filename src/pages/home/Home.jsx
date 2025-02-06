import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import logo1 from "../../assets/logo/home_logo.png";
import logo2 from "../../assets/logo/home_logo_part_2.png";
import video from "../../assets/video/banner_video.mp4";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize video when component mounts
    if (videoRef.current) {
      videoRef.current.src = video;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video autoplay failed:", error);
        });
      }
    }

    // Cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  const handleLogin = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate("/login");
  };

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate("/socialLogin");
  };

  return (
    <div className="relative bg-[#49BBDF] h-screen overflow-hidden pt-[70px] md:pt-5 border-white">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-fill"
      >
        <source src={video} type="video/mp4" />
      </video>

      <motion.div
        className="absolute inset-0 flex justify-center items-center z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative w-full h-full flex justify-center items-center">
          <motion.div 
            className="absolute w-full flex justify-center"
            style={{
              transform: window.innerWidth <= 768 ? 
                'translate(-1.2%, 3%)' : 
                `translate(
                  ${window.innerHeight <= 720 ? '-0.4%' : 
                    window.innerHeight <= 1080 ? '-0.3%' : '-1.2%'
                  }, 
                  ${window.innerHeight <= 720 ? '2%' : 
                    window.innerHeight <= 1080 ? '2.5%' : '3%'
                  })`
            }}
          >
            <motion.img
              src={logo2}
              alt="coin logo"
              className="w-auto h-auto max-w-[30%] md:max-w-[25%] lg:max-w-[20%]"
              initial={{ opacity: 0, y: -300 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                type: "spring",
                stiffness: 5,
                damping: 2,
              }}
            />
          </motion.div>

          <img
            src={logo1}
            alt="main logo"
            className="w-auto h-auto max-w-[80%] md:max-w-[70%] lg:max-w-[60%]"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-[40px] lg:bottom-8 w-full flex flex-col gap-3 justify-center items-center z-20">
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