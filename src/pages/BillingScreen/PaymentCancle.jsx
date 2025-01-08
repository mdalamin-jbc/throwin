import  { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();

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
          text: error.response?.data?.detail || "サーバーとの通信中にエラーが発生しました。",
          confirmButtonText: "戻る",
        });
      }
    };

    cancelPayment();
  }, [searchParams]);

  return (
    <div className="text-center mt-5">
      <h2>支払いがキャンセルされました。</h2>
      <p>もう一度試すには戻ってください。</p>
    </div>
  );
};

export default PaymentCancel;
