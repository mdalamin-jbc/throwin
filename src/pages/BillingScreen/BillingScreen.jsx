import { useEffect, useState } from "react";
import TitleBar from "../../components/TitleBar";
import StaffProfileCard from "../../components/StaffProfileCard/StaffProfileCard";
import BillingForm from "../../components/Billing/BillingForm";
import PaymentModal from "../../components/Billing/PaymentModal";
import UseUserDetails from "../../hooks/UseUserDetails";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SlPaypal } from "react-icons/sl";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import toast from "react-hot-toast";

const BillingScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState("0");
  const [message, setMessage] = useState("");
  const [billingData, setBillingData] = useState({});
  const staff = JSON.parse(localStorage.getItem("staff"));
  const { userDetails } = UseUserDetails();
  const axiosPrivate = useAxiosPrivate();

  console.log(staff, userDetails);

  useEffect(() => {
    setBillingData({
      nickname: userDetails?.name || "Guest",
      staff_uid: staff?.uid,
      restaurant_uid: staff?.restaurant_uid,
      store_uid: staff?.store_uid,
      message: message,
      amount: selectedAmount,
      // amount: 1000,
      currency: "JPY",
      payment_method: "paypal",
      return_url: `https://alpha.throwin-glow.com/staff/${staff?.username}/chargeCompleted`,
      cancel_url: "https://alpha.throwin-glow.com/payment-cancle",
    });
  }, [
    message,
    selectedAmount,
    staff?.store_uid,
    staff?.restaurant_uid,
    staff?.uid,
    staff?.username,
    userDetails?.name,
  ]);

  const handlePaypalPayment = async () => {
    try {
      if (billingData.amount < 500) {
        throw new Error("金額は500円以上でなければなりません。");
      }

      if (billingData.amount > 49999) {
        throw new Error("金額は 50,000円以下でなければなりません。");
      }

      if (!billingData.staff_uid) {
        throw new Error("Staff ID is required.");
      }

      console.log("Sending Billing Data:", billingData);

      const response = await axiosPrivate.post(
        `/payment_service/make-payment/`,
        billingData
      );

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        const approvalUrl = response.data.approval_url;
        console.log("Redirecting to PayPal Approval URL:", approvalUrl);

        // Redirect to PayPal for user approval
        window.location.href = approvalUrl;
      } else {
        throw new Error("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error creating payment:",
        error.response?.data?.detail || error.message
      );

      toast.error(
        error.response?.data?.detail ||
          error.message ||
          "支払いの作成に失敗しました！",
        {
          position: "top-center",
          duration: 3000,
        }
      );
    }
  };

  const handleOpenModal = () => {
    document.getElementById("payment-by-paypal-modal").showModal();
  };

  return (
    <div className="mb-[120px]">
      <TitleBar title="Billing" />
      <div className="max-w-[430px] mx-auto">
        <StaffProfileCard staff={staff} />
        <BillingForm
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          message={message}
          setMessage={setMessage}
        />
        {/* Button to open the modal */}

        <div className="flex gap-[9px] text-3xl font-semibold">
          <h3 className="flex items-center border rounded px-3 py-2 gap-1">
            <FaApple />
            <span>Pay</span>
          </h3>
          <h3 className="flex items-center border rounded px-3 py-2 gap-1">
            <FcGoogle />
            <span>Pay</span>
          </h3>
          <button
            className="flex items-center border rounded px-3 py-2 gap-1 "
            onClick={handleOpenModal}
          >
            <SlPaypal />
            <span>Pay</span>
          </button>
        </div>

        <PaymentModal
          staff={staff}
          selectedAmount={selectedAmount}
          handlePaypalPayment={handlePaypalPayment}
        />
      </div>
    </div>
  );
};

export default BillingScreen;
