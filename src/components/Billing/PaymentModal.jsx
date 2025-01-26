const PaymentModal = ({ staff, selectedAmount, handlePaypalPayment }) => (
  <dialog
    id="payment-by-paypal-modal"
    className="modal max-w-[343px] mx-auto rounded-lg shadow-lg"
  >
    <div className="modal-box p-0 rounded-lg overflow-hidden">
      {/* Header with PayPal branding */}
      <div className="bg-[#49BBDF] text-white flex items-center justify-center py-4">
        <img
          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
          alt="PayPal Logo"
          className="h-14 rounded-[10px]"
        />
      </div>

      {/* Modal Content */}
      <div className="px-6 pt-4 pb-4">
        <p className="text-base font-medium">
          <span className="underline font-semibold">{staff?.name}</span> に、
          スローインします。 よろしいですか？
        </p>

        <div className="flex justify-between items-center text-sm mt-4">
          <p className="text-sm font-medium">金額 : {selectedAmount}円</p>
          <p>決済方法 : PayPal</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 border-t border-gray-200">
        <button
          onClick={() =>
            document.getElementById("payment-by-paypal-modal").close()
          }
          className="px-4 py-3 w-1/2 text-red-600 border-r border-gray-300 text-center text-[15px]"
        >
          キャンセル
        </button>
        <button
          onClick={handlePaypalPayment}
          className="px-4 py-3 w-1/2 text-blue-600 text-[15px] text-center"
        >
          確定
        </button>
      </div>
    </div>
  </dialog>
);

export default PaymentModal;
