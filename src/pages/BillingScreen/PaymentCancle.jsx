import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cancelPayment = async () => {
      const token = searchParams.get("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "支払いIDが見つかりません。",
          text: "キャンセルリクエストには有効な支払いIDが必要です。",
          confirmButtonText: "戻る",
        });
        return;
      }

      try {
        const response = await axios.get("/payment_service/paypal-cancel/", {
          params: { token },
        });

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "支払いがキャンセルされました。",
            text: "支払いが正常にキャンセルされました。",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "エラーが発生しました。",
            text: response.data?.error || "不明なエラーが発生しました。",
            confirmButtonText: "戻る",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "キャンセル処理に失敗しました。",
          text:
            error.response?.data?.detail ||
            "サーバーとの通信中にエラーが発生しました。",
          confirmButtonText: "戻る",
        });
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
