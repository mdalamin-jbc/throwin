import React, { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Circles } from "react-loader-spinner";
import logo from "../../assets/images/home/logo.png";
import UseGetByStaffName from "../../hooks/UseGetByStaffName";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import confetti from "canvas-confetti";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const ChargeCompleted = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const { staff, isLoading: staffLoading } = UseGetByStaffName(username);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const validatedRef = useRef(false);
  const { width, height } = useWindowSize();

  const fireConfetti = () => {
    const count = 200;
    const defaults = { 
      origin: { y: 0.7 },
      colors: ['#65D0F2', '#2399F4', '#ffffff']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const validatePayment = useCallback(async () => {
    if (validatedRef.current) return;
    validatedRef.current = true;

    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    if (!paymentId || !payerId) {
      toast.error("有効な支払いIDまたは支払者IDが見つかりません。", {
        position: "top-center",
        duration: 3000,
      });
      setPaymentStatus("failed");
      return;
    }

    try {
      const response = await axiosPrivate.get(
        "/payment_service/paypal-success/",
        { params: { paymentId, PayerID: payerId } }
      );

      if (response.status === 200) {
        setPaymentStatus("success");
        fireConfetti();
        toast.success(`取引ID: ${paymentId}`, {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      setPaymentStatus("failed");
      toast.error(
        error.response?.data?.detail || error.message || "支払いの検証に失敗しました！",
        { position: "top-center", duration: 3000 }
      );
    }
  }, [searchParams, axiosPrivate]);

  useEffect(() => {
    if (paymentStatus === null) {
      validatePayment();
    }
  }, [validatePayment, paymentStatus]);

  if (staffLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen"
      >
        <Circles height="80" width="80" color="#49BBDF" ariaLabel="loading" />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="relative min-h-screen pb-32 overflow-hidden"
      >
        <Helmet>
          <title>Throwin | Billing Page</title>
        </Helmet>

        <header className="relative z-10">
          <TitleBar 
            title="" 
            style="mb-0 w-full backdrop-blur-sm bg-white/80" 
            icon={
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-28" 
                src={logo} 
                alt="Throwin Logo" 
              />
            } 
          />
          <Confetti 
            width={width} 
            height={height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        </header>

        <main className="min-w-[375px] mx-auto text-[#44495B] mt-11 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h3 variants={fadeInUp} className="font-bold text-2xl">
              {staff?.name}
            </motion.h3>
            
            <motion.div
              variants={scaleIn}
              className="relative w-40 h-40 mx-auto mt-3"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] blur-lg opacity-50"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.5, 0.6, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img
                className="rounded-full w-40 h-40 relative z-10 object-cover border-4 border-white shadow-lg"
                src={staff.image?.medium || "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"}
                alt={`${staff?.name}'s profile`}
                loading="eager"
              />
            </motion.div>

            <motion.h3 
              variants={fadeInUp}
              className="font-bold text-2xl w-[85%] mx-auto mt-6 mb-4"
            >
              ありがとうございます！ スローインしました
            </motion.h3>
            
            <motion.div variants={fadeInUp}>
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link to="/search" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ButtonPrimary 
                style="flex justify-center w-full rounded-full font-hiragino py-3 font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4] shadow-lg hover:shadow-xl transition-all duration-300" 
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