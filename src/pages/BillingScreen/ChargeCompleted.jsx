import { useEffect, useState } from "react";
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

const ChargeCompleted = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { staff, isLoading: staffLoading } = UseGetByStaffName(username);
  const [isValidating, setIsValidating] = useState(true);
  const [isPaymentValidated, setIsPaymentValidated] = useState(false); // Prevent revalidation

  useEffect(() => {
    const validatePayment = async () => {
      const paymentId = searchParams.get("paymentId");
      const payerId = searchParams.get("PayerID");

      if (!paymentId || !payerId) {
        Swal.fire({
          icon: "error",
          title: "支払いが無効です。",
          text: "有効な支払いIDまたは支払者IDが見つかりません。",
          confirmButtonText: "はい",
        });
        setIsValidating(false);
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
          Swal.fire({
            icon: "success",
            title: "支払いが成功しました！",
            text: `取引ID: ${response.data.transaction_id}`,
            confirmButtonText: "はい",
          });
          navigate("/history"); // Redirect after success
        } else {
          throw new Error("Unexpected response during payment validation.");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "支払いの検証に失敗しました！",
          text: error.response?.data?.detail || error.message,
          confirmButtonText: "はい",
        });
      } finally {
        setIsValidating(false);
        setIsPaymentValidated(true); // Mark as validated
      }
    };

    // Only run the validation if it hasn't been validated yet
    if (!isPaymentValidated) {
      validatePayment();
    }
  }, [searchParams, navigate, axiosPrivate, isPaymentValidated]);

  if (isValidating || staffLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#49BBDF" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="mb-[120px]">
      <Helmet>
        <title>Throwin | Billing Page</title>
      </Helmet>
      <div>
        <TitleBar
          title=""
          style="mb-0 w-full"
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo" />
          }
        />
        {/* Effect image */}
        <div className="absolute left-0 right-0 flex justify-center">
          <img
            src={effect}
            alt="effect"
            className="min-w-[375px] max-w-[100%]"
          />
        </div>
      </div>
      <div className="min-w-[375px] mx-auto text-[#44495B] mt-[43px]">
        <div className="text-center">
          <h3 className="font-bold text-[28px]">{staff.name}</h3>
          <img
            className="rounded-full w-[163px] mx-auto mt-3"
            src="https://shorturl.at/XqwIr"
            alt=""
          />
          <h3 className="font-bold text-[28px] w-[85%] mx-auto mt-6 mb-4">
            ありがとうございます！ スローインしました
          </h3>
          <Link className="text-[#5297FF] font-bold text-sm" to="/history">
            <p>履歴を見る</p>
          </Link>
        </div>
      </div>
      {/* Button at the bottom */}
      <Link to="/history">
        <div className="absolute bottom-[114px] w-full px-6">
          <ButtonPrimary
            style="flex justify-center w-full rounded-full font-hiragino py-[12px] font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4]"
            btnText="他のメンバーを探す"
          />
        </div>
      </Link>
    </div>
  );
};

export default ChargeCompleted;
