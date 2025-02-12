import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import logo from "../../assets/images/home/logo.png";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// Animation configurations remain unchanged
const pageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.4, delayChildren: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const imageScale = {
  hidden: { scale: 0.9, opacity: 0, rotateZ: -2 },
  visible: {
    scale: 1,
    opacity: 1,
    rotateZ: 0,
    transition: { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const ChargeCompleted = () => {
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const validatedRef = useRef(false);
  const { width, height } = useWindowSize();

  // Retrieve staff details from local storage
  const storedStaffDetails = localStorage.getItem("staff_details");
  const staff_details = storedStaffDetails ? JSON.parse(storedStaffDetails) : null;

  console.log("Staff Details:", staff_details); // Debugging output

  const validatePayment = useCallback(async () => {
    if (validatedRef.current) return;
    validatedRef.current = true;

    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    if (!paymentId || !payerId) {
      toast.error("有効な支払いIDまたは支払者IDが見つかりません。", { position: "top-center", duration: 4000 });
      setPaymentStatus("failed");
      return;
    }

    try {
      if (paymentId.startsWith("VISA_")) {
        setPaymentStatus("success");
        toast.success(`取引ID: ${paymentId}`, { position: "top-center", duration: 4000 });
        return;
      }

      const response = await axiosPrivate.get("/payment_service/paypal-success/", {
        params: { paymentId, PayerID: payerId },
      });

      if (response.status === 200) {
        setPaymentStatus("success");
        toast.success(`取引ID: ${paymentId}`, { position: "top-center", duration: 4000 });
      }
    } catch (error) {
      setPaymentStatus("failed");
      toast.error(error.response?.data?.detail || error.message || "支払いの検証に失敗しました！", {
        position: "top-center",
        duration: 4000,
      });
    }
  }, [searchParams, axiosPrivate]);

  useEffect(() => {
    if (paymentStatus === null) {
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
        <Helmet>
          <title>Throwin | Billing Page</title>
        </Helmet>

        <header className="relative z-10">
          <TitleBar
            title=""
            style="mb-0 w-full backdrop-blur-md bg-white/90 shadow-sm"
            icon={
              <motion.img variants={imageScale} className="w-28" src={logo} alt="Throwin Logo" />
            }
          />
          <Confetti width={width} height={height} recycle={false} numberOfPieces={200} gravity={0.12} colors={["#65D0F2", "#2399F4", "#ffffff", "#91E3FF"]} />
        </header>

        <main className="min-w-[375px] mx-auto text-[#44495B] mt-11 px-4">
          <motion.div variants={pageTransition} className="text-center">
            <motion.h3 variants={fadeInUp} className="font-bold text-2xl">
              {staff_details?.name || "ゲスト"}
            </motion.h3>

            <motion.div variants={fadeInUp} className="relative w-40 h-40 mx-auto mt-8">
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] blur-xl" />
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] opacity-30 blur-lg" />

              {staff_details ? (
                <motion.img
                  variants={imageScale}
                  className="rounded-full w-40 h-40 relative z-10 object-cover border-4 border-white shadow-xl"
                  src={staff_details.image?.medium || "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"}
                  alt={`${staff_details?.name || "User"}'s profile`}
                  loading="eager"
                />
              ) : (
                <p className="text-gray-500 text-center">No staff details available</p>
              )}
            </motion.div>

            <motion.h3 variants={fadeInUp} className="font-bold text-2xl w-[85%] mx-auto mt-8 mb-6">
              ありがとうございます！ スローインしました
            </motion.h3>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
              <Link className="text-[#5297FF] font-bold text-sm hover:underline inline-block" to="/history">
                <p>履歴を見る</p>
              </Link>
            </motion.div>
          </motion.div>
        </main>

        <motion.div className="fixed bottom-28 left-0 w-full px-6" variants={fadeInUp}>
          <Link to="/search" className="block">
            <motion.div whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
              <ButtonPrimary style="flex justify-center w-full rounded-full font-hiragino py-4 font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4] shadow-xl hover:shadow-2xl transition-all duration-500" btnText="他のメンバーを探す" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChargeCompleted;
