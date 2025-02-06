import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import logo from "/logo.png";
import video from "../../assets/video/banner_video.mp4";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const logoPromise = new Promise((resolve) => {
          const img = new Image();
          img.src = logo;
          img.onload = resolve;
        });

        const videoElement = videoRef.current;
        const videoPromise = new Promise((resolve) => {
          if (videoElement) {
            videoElement.preload = "auto";
            if (videoElement.readyState >= 3) {
              resolve();
            } else {
              videoElement.addEventListener("canplay", resolve, { once: true });
            }
          }
        });

        await Promise.all([logoPromise, videoPromise]);
        setAssetsLoaded(true);

        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setContentVisible(true);
          }, 400);
        }, 1200);
      } catch (error) {
        console.error("Asset loading error:", error);
        setAssetsLoaded(true);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  const handleNavigation = (path) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate(path);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#49BBDF]/5 via-[#2399F4]/5 to-[#49BBDF]/5">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#49BBDF]/10 via-white/5 to-[#2399F4]/10 backdrop-blur-sm"
          >
            <div className="relative flex items-center justify-center">
              {/* Animated ring */}
              <motion.div
                className="absolute w-32 h-32 rounded-full border-2 border-[#49BBDF]/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Secondary glow ring */}
              <motion.div
                className="absolute w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(73,187,223,0.1) 0%, rgba(73,187,223,0) 70%)"
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Logo container */}
              <motion.div
                className="relative w-24 h-24 flex items-center justify-center"
                animate={{
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Logo */}
                <motion.img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-contain relative z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Rotating dots */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#49BBDF]"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 45}deg) translate(60px, -50%)`,
                    }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: assetsLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill"
        >
          <source src={video} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </motion.div>

      {contentVisible && (
        <>
          <motion.div
            className="absolute inset-0 flex justify-center items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.img
              src={logo}
              alt="main logo"
              className="w-auto h-auto max-w-[80%] md:max-w-[70%] lg:max-w-[60%]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>

          <div className="fixed bottom-8 left-0 right-0 flex flex-col gap-3 items-center z-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#65D0F2] to-[#2399F4] rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300 blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.button
                onClick={() => handleNavigation("/socialLogin")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative transform transition-all duration-300 overflow-hidden group"
              >
                <ButtonPrimary
                  btnText="始める"
                  style="bg-white min-w-[350px] rounded-full text-center py-[15px] lg:py-6 font-bold text-sky-500 shadow-lg hover:shadow-2xl transition-all duration-300"                />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
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
        </>
      )}
    </div>
  );
};

export default Home;