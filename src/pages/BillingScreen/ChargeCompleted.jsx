import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  useSearchParams,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import logo from "../../assets/images/home/logo.png";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import confetti from "canvas-confetti";
import UseGetUserDetails from "../../hooks/Staff/UseGetUserDetails";

// Animation configurations remain the same
const pageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.4,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageScale = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    rotateZ: -2,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 1.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const pulseAnimation = {
  scale: [1, 1.02, 1],
  opacity: [0.5, 0.6, 0.5],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const gradientRotation = {
  rotate: [0, 360],
  transition: {
    duration: 12,
    repeat: Infinity,
    ease: "linear",
  },
};

const ChargeCompleted = () => {
  const { store_code, username } = useParams();
  const { staff_details } = UseGetUserDetails(username, store_code);
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const validatedRef = useRef(false);
  const { width, height } = useWindowSize();

  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#65D0F2", "#2399F4", "#ffffff", "#91E3FF"],
      spread: 70,
      ticks: 200,
      gravity: 0.8,
      scalar: 0.8,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 45 });
    fire(0.2, { spread: 50, startVelocity: 40 });
    fire(0.35, { spread: 80, decay: 0.92, scalar: 0.8 });
    fire(0.1, { spread: 100, startVelocity: 25, decay: 0.92 });
    fire(0.1, { spread: 100, startVelocity: 35 });
  };

  const validatePayment = useCallback(async () => {
    if (validatedRef.current) return;
    validatedRef.current = true;

    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    
    // Check if either parameter is missing
    if (!paymentId || !payerId) {
      // Try to get payment details from localStorage as a fallback
      const storedPayment = localStorage.getItem("payment_details");
      
      if (storedPayment) {
        try {
          const paymentDetails = JSON.parse(storedPayment);
          
          // Use stored payment details instead
          setPaymentStatus("success");
          setShowConfetti(true);
          
          // Show only the success toast
          toast.success(`取引ID: ${paymentDetails.paymentId}`, {
            position: "top-center",
            duration: 6000,
          });
          
          // Clear the stored payment to prevent reuse
          localStorage.removeItem("payment_details");
          
          // Trigger confetti with a slight delay
          setTimeout(fireConfetti, 500);
          return;
        } catch (e) {
          console.error("Error parsing stored payment details", e);
        }
      }
      
      // No error toast - just set failure state
      setPaymentStatus("failed");
      return;
    }

    try {
      // Handle Visa direct payment
      if (payerId === "VISA_DIRECT") {
        setPaymentStatus("success");
        setShowConfetti(true);
        
        // Show only the success toast
        toast.success(`取引ID:`, {
          position: "top-center",
          duration: 6000,
        });
        
        setTimeout(fireConfetti, 500);
        return;
      }
      
      // Handle credit card direct payment
      if (payerId === "CREDIT_CARD_DIRECT") {
        setPaymentStatus("success");
        setShowConfetti(true);
        
        // Show only the success toast
        toast.success(`支払いが成功しました`, {
          position: "top-center",
          duration: 6000,
        });
        
        setTimeout(fireConfetti, 500);
        return;
      }

      // Regular PayPal payment validation
      const response = await axiosPrivate.get(
        "/payment_service/paypal-success/",
        { params: { paymentId, PayerID: payerId } }
      );
      
      if (response.status === 200) {
        setPaymentStatus("success");
        setShowConfetti(true);
        
        // Show only the success toast
        toast.success(`取引ID: ${paymentId}`, {
          position: "top-center",
          duration: 6000,
        });
        
        setTimeout(fireConfetti, 500);
      }
    } catch (error) {
      // No error toast - just set failure state
      setPaymentStatus("failed");
    }
  }, [searchParams, axiosPrivate]);

  useEffect(() => {
    if (paymentStatus === null) {
      // Validate payment immediately
      validatePayment();
    }
  }, [validatePayment, paymentStatus]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative min-h-screen pb-32 overflow-hidden bg-gradient-to-b from-white to-blue-50"
      >
        {/* Add the Toaster component for toast notifications */}
        <Toaster />
        
        <Helmet>
          <title>Throwin | Billing Page</title>
        </Helmet>

        <header className="relative z-10">
          <TitleBar
            title=""
            style="mb-0 w-full backdrop-blur-md bg-white/90 shadow-sm"
            icon={
              <motion.img
                variants={imageScale}
                className="w-28"
                src={logo}
                alt="Throwin Logo"
              />
            }
          />
          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={200}
              gravity={0.12}
              colors={["#65D0F2", "#2399F4", "#ffffff", "#91E3FF"]}
            />
          )}
        </header>

        <main className="min-w-[375px] mx-auto text-[#44495B] mt-11 px-4">
          <motion.div variants={pageTransition} className="text-center">
            <motion.h3 variants={fadeInUp} className="font-bold text-2xl">
              {staff_details?.name}
            </motion.h3>

            <motion.div
              variants={fadeInUp}
              className="relative w-40 h-40 mx-auto mt-8"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] blur-xl"
                animate={pulseAnimation}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] opacity-30 blur-lg"
                animate={gradientRotation}
              />
              <motion.img
                variants={imageScale}
                className="rounded-full w-40 h-40 relative z-10 object-cover border-4 border-white shadow-xl"
                src={
                  staff_details?.image?.medium ||
                  "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                }
                alt={`${staff_details?.name}'s profile`}
                loading="eager"
              />
            </motion.div>

            <motion.h3
              variants={fadeInUp}
              className="font-bold text-2xl w-[85%] mx-auto mt-8 mb-6"
            >
              ありがとうございます！ スローインしました
            </motion.h3>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link
                className="text-[#5297FF] font-bold text-sm hover:underline inline-block"
                to="/history"
              >
                <p>履歴を見る</p>
              </Link>
            </motion.div>
          </motion.div>
        </main>

        <motion.div
          className="fixed bottom-28 left-0 w-full px-6"
          variants={fadeInUp}
        >
          <Link to="/search" className="block">
            <motion.div
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <ButtonPrimary
                style="flex justify-center w-full rounded-full font-hiragino py-4 font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4] shadow-xl hover:shadow-2xl transition-all duration-500"
                btnText="他のメンバーを探す"
              />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChargeCompleted;