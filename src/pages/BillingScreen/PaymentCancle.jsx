import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cancelPayment = async () => {
      const token = searchParams.get("token");

      if (!token) {
        toast.error("キャンセルリクエストには有効な支払いIDが必要です。", {
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      try {
        const response = await axios.get("/payment_service/paypal-cancel/", {
          params: { token },
        });

        if (response.status === 200) {
          toast.success("支払いが正常にキャンセルされました。", {
            position: "top-center",
            duration: 3000,
          });
        } else {
          toast.error(response.data?.error || "不明なエラーが発生しました。", {
            position: "top-center",
            duration: 3000,
          });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.detail ||
            "サーバーとの通信中にエラーが発生しました。",
          {
            position: "top-center",
            duration: 3000,
          }
        );
      }
    };

    cancelPayment();
  }, [searchParams]);

  const handleGoBack = () => {
    navigate(-3); // Go back 3 steps in the history
  };

  return (
    <div className="text-center mt-5">
      <h2>支払いがキャンセルされました。</h2>
      <p>もう一度試すには戻ってください。</p>
      <button
        onClick={handleGoBack}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        戻る
      </button>
    </div>
  );
};

export default PaymentCancel;
