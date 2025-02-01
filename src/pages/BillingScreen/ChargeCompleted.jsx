import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Circles } from "react-loader-spinner";
import logo from "../../assets/images/home/logo.png";
import effect from "../../assets/images/billing/billingEffect.png";
import UseGetByStaffName from "../../hooks/UseGetByStaffName";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import confetti from "canvas-confetti";

const ChargeCompleted = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const { staff, isLoading: staffLoading } = UseGetByStaffName(username);

  const [paymentStatus, setPaymentStatus] = useState(null);
  const validatedRef = useRef(false);
  const { width, height } = useWindowSize();

  const fireConfetti = () => {
    var count = 200;
    var defaults = { origin: { y: 0.7 } };

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
      await toast.error("有効な支払いIDまたは支払者IDが見つかりません。", {
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
        await toast.success(`取引ID: ${paymentId}`, {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      setPaymentStatus("failed");
      await toast.error(
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
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#49BBDF" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative min-h-screen pb-32">
      <Helmet>
        <title>Throwin | Billing Page</title>
      </Helmet>

      <header>
        <TitleBar title="" style="mb-0 w-full" icon={<img className="w-28" src={logo} alt="Throwin Logo" />} />
        <div className="absolute left-0 right-0 flex justify-center">
          <motion.img src={effect} alt="Billing Effect" className="min-w-[375px] max-w-full" loading="eager" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
        </div>
        <Confetti width={width} height={height} />
      </header>

      <main className="min-w-[375px] mx-auto text-[#44495B] mt-11">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-center">
          <h3 className="font-bold text-2xl">{staff?.name}</h3>
          <motion.img className="rounded-full w-40 h-40 mx-auto mt-3 object-cover" src={staff.image?.medium ? staff.image?.medium : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"} alt={`${staff?.name}'s profile`} loading="eager" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
          <h3 className="font-bold text-2xl w-[85%] mx-auto mt-6 mb-4">ありがとうございます！ スローインしました</h3>
          <Link className="text-[#5297FF] font-bold text-sm hover:underline" to="/history"><p>履歴を見る</p></Link>
        </motion.div>
      </main>

      <Link to="/search" className="fixed bottom-28 left-0 w-full px-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.2 }}>
          <ButtonPrimary style="flex justify-center w-full rounded-full font-hiragino py-3 font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4] hover:opacity-90 transition-opacity" btnText="他のメンバーを探す" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ChargeCompleted;
