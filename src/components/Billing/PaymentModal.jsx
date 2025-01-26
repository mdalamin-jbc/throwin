

const PaymentModal = ({ staff, selectedAmount, handleConfirm }) => (
  <dialog id="payment-modal">
    <h3>{staff?.name} にスローインします</h3>
    <p>金額: {selectedAmount}円</p>
    <div>
      <button onClick={handleConfirm}>確定</button>
      <button onClick={() => document.getElementById("payment-modal").close()}>
        キャンセル
      </button>
    </div>
  </dialog>
);

export default PaymentModal;
