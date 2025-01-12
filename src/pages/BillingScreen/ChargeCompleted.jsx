import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
import logo from "../../assets/images/home/logo.png";
import effect from "../../assets/images/billing/billingEffect.png";
import UseGetByStaffName from "../../hooks/UseGetByStaffName";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { motion } from "framer-motion"; // Importing motion

const ChargeCompleted = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const { staff, isLoading: staffLoading } = UseGetByStaffName(username);

  const [paymentStatus, setPaymentStatus] = useState(null); // Track payment validation result
  const validatedRef = useRef(false); // Track if validation has already occurred

  const validatePayment = useCallback(async () => {
    // Only proceed if validation hasn't been done before
    if (validatedRef.current) return;
    validatedRef.current = true;

    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    if (!paymentId || !payerId) {
      await Swal.fire({
        icon: "error",
        title: "支払いが無効です。",
        text: "有効な支払いIDまたは支払者IDが見つかりません。",
        confirmButtonText: "はい",
      });
      setPaymentStatus("failed");
      return;
    }

    try {
      const response = await axiosPrivate.get(
        "/payment_service/paypal-success/",
        {
          params: { paymentId, PayerID: payerId },
        }
      );

      if (response.status === 200) {
        setPaymentStatus("success");
        await Swal.fire({
          icon: "success",
          title: "支払いが成功しました！",
          text: `取引ID: ${paymentId}`,
          confirmButtonText: "はい",
        });
      }
    } catch (error) {
      setPaymentStatus("failed");
      await Swal.fire({
        icon: "error",
        title: "支払いの検証に失敗しました！",
        text: error.response?.data?.detail || error.message,
        confirmButtonText: "はい",
      });
    }
  }, [searchParams, axiosPrivate]);

  useEffect(() => {
    // Trigger payment validation only if status is null (not yet validated)
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
    <div className="relative min-h-screen pb-32">
      <Helmet>
        <title>Throwin | Billing Page</title>
      </Helmet>

      <header>
        <TitleBar
          title=""
          style="mb-0 w-full"
          icon={<img className="w-28" src={logo} alt="Throwin Logo" />}
        />
        <div className="absolute left-0 right-0 flex justify-center">
          <img
            src={effect}
            alt="Billing Effect"
            className="min-w-[375px] max-w-full"
            loading="eager"
          />
        </div>
      </header>

      <main className="min-w-[375px] mx-auto text-[#44495B] mt-11">
        <div className="text-center">
          <motion.h3
            className="font-bold text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {staff?.name}
          </motion.h3>

          <motion.img
            className="rounded-full w-40 h-40 mx-auto mt-3 object-cover"
            src="https://i.postimg.cc/Fzf19nfb/5e3ca18b58c181ccc105ca95163e891c.jpg"
            alt={`${staff?.name}'s profile`}
            loading="eager"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.h3
            className="font-bold text-2xl w-[85%] mx-auto mt-6 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            ありがとうございます！ スローインしました
          </motion.h3>

          <motion.Link
            className="text-[#5297FF] font-bold text-sm hover:underline"
            to="/history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <p>履歴を見る</p>
          </motion.Link>
        </div>
      </main>

      <motion.Link
        to="/search"
        className="fixed bottom-28 left-0 w-full px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <ButtonPrimary
          style="flex justify-center w-full rounded-full font-hiragino py-3 font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4] hover:opacity-90 transition-opacity"
          btnText="他のメンバーを探す"
        />
      </motion.Link>
    </div>
  );
};

export default ChargeCompleted;
