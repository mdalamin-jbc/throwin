import PropTypes from "prop-types";
const BillingForm = ({
  selectedAmount,
  setSelectedAmount,
  message,
  setMessage,
}) => {
  // Numeric values for amounts
  const amounts = [1000, 3000, 5000, 10000];

  const handleAmountChange = (event) => {
    // Remove commas and parse the value as a number
    const input = event.target.value.replace(/,/g, "");
    const numericValue = parseInt(input, 10);

    // Update state with numeric value formatted with commas
    setSelectedAmount(isNaN(numericValue) ? "" : numericValue);
  };

  const formatWithCommas = (value) => {
    return value.toLocaleString();
  };

  return (
    <div className="billing-form">
      <div className="">
        <div className="flex justify-between items-center px-5 mt-[51px] border-b-2 pb-2 text-[#C0C0C0]">
          <h4 className="font-semibold text-sm">金額</h4>
          <div className="font-semibold text-[28px] text-[#C0C0C0]">
            <input
              type="text"
              value={selectedAmount ? formatWithCommas(selectedAmount) : ""}
              onChange={handleAmountChange}
              className="text-right mr-1 bg-transparent max-w-[200px] focus:outline-none w-fit placeholder:text-[16px] placeholder:font-normal"
              placeholder="金額を入力..."
            />
            円
          </div>
        </div>

        <div className="flex gap-[14px] overflow-x-auto scrollbar-hide font-semibold text-sm text-[#49BBDF]">
          {amounts.map((amount, index) => (
            <h4
              key={index}
              onClick={() => setSelectedAmount(amount)}
              className={`border rounded-lg mt-[22px] px-4 py-2 whitespace-nowrap cursor-pointer 
                      ${
                        selectedAmount === amount
                          ? "bg-[#49BBDF] text-white"
                          : "border-[#49BBDF] text-[#49BBDF]"
                      }`}
            >
              {formatWithCommas(amount)}円
            </h4>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <h2 className="font-semibold text-lg text-[#44495B] mb-2">
          応援メッセージ
        </h2>
        {/* Message of Support */}
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message} // Bind state to the textarea
          className="border-[1px] rounded-md w-full h-[200px] px-5 py-3 text-[#434343]  text-sm"
          placeholder="メッセージを書く..."
        />
      </div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg">決済方法</h2>
        <h2 className="font-bold text-sm my-4">スマホ決済</h2>
      </div>
    </div>
  );
};

BillingForm.propTypes = {
  selectedAmount: PropTypes.number.isRequired,
  setSelectedAmount: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default BillingForm;
