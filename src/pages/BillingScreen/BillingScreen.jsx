import { useEffect, useState } from "react";
import TitleBar from "../../components/TitleBar";
import StaffProfileCard from "../../components/StaffProfileCard/StaffProfileCard";
import BillingForm from "../../components/Billing/BillingForm";
import PaymentModal from "../../components/Billing/PaymentModal";
import UseUserDetails from "../../hooks/UseUserDetails";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SlPaypal } from "react-icons/sl";

const BillingScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState("0");
  const [message, setMessage] = useState("");
  const [billingData, setBillingData] = useState({});
  const staff = JSON.parse(localStorage.getItem("staff"));
  const { userDetails } = UseUserDetails();

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

  const handleConfirm = () => {
    console.log("Payment Confirmed!", billingData);
    // document.getElementById("payment-modal").close(); // Close modal after confirmation
  };

  const handleOpenModal = () => {
    document.getElementById("payment-modal").showModal();
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
          handleConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

export default BillingScreen;
