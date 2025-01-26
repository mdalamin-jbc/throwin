import { useState } from "react";
import TitleBar from "../../components/TitleBar";
import StaffProfileCard from "../../components/StaffProfileCard/StaffProfileCard";
import BillingForm from "../../components/Billing/BillingForm";
import PaymentModal from "../../components/Billing/PaymentModal";

const BillingScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState("0");
  const [message, setMessage] = useState("");
  const [staff] = useState({ name: "John Doe", introduction: "Best staff!" });

  const handleConfirm = () => {
    console.log("Confirmed!");
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
