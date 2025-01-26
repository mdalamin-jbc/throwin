import React from "react";

const PaymentMethodSelector = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <div className="payment-method-selector">
      <h4>決済方法</h4>
      <div>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={() => setSelectedMethod("paypal")}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            value="credit-card"
            checked={selectedMethod === "credit-card"}
            onChange={() => setSelectedMethod("credit-card")}
          />
          クレジットカード
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
