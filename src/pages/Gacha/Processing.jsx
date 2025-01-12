import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import img1 from "../../assets/images/gacha/gachaImg1.png";
import img2 from "../../assets/images/gacha/gachaimg2.png";

const Processing = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    // Start animation for the first image
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1 },
    });

    // Transition to the second image after 2 seconds
    const timer = setTimeout(() => {
      setShowSecondImage(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
  }, [controls]);

  return (
    <motion.div
      className="mb-[120px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TitleBar
        style="mb-0 w-full"
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            aria-label="Go Back"
          />
        }
        title=""
        icon={
          <motion.img
            className="w-[110px] items-center"
            src={logo}
            alt="logo"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        }
      />
      <div className="max-w-[430px] mx-auto">
        <div className="flex justify-center">
          {!showSecondImage ? (
            <motion.img
              src={img1}
              alt="Processing..."
              className="w-[370px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
            />
          ) : (
            <Link to="got-ticket">
              <motion.img
                src={img2}
                alt="Gacha Result"
                className="w-[300px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Processing;
