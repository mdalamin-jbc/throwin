import { MdKeyboardArrowDown } from "react-icons/md";
import UseGetPaymentHistoryResturentWoner from "../../../hooks/Dashboard/UseGetPaymentHistoryResturentWoner";
import { Link } from "react-router-dom";

const DeHistory = () => {
  const { PaymentHistoryResturentWoner, refetch, isLoading, isError, error } =
    UseGetPaymentHistoryResturentWoner();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${day}/${month}`;
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">履歴</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 ">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          Throwin履歴
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="overflow-x-auto mt-6">
            <table className="table ">
              {/* head */}
              <thead className=" bg-[#EEEEEE] text-[#434343] ">
                <tr>
                  <th>
                    <button className="flex items-center ">
                      日付 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      店舗（チーム）名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      金額 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th className="">
                    <button className="flex items-center">
                      メンバー名 <MdKeyboardArrowDown />
                    </button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {PaymentHistoryResturentWoner.length > 0 ? (
                  PaymentHistoryResturentWoner.map((payment, index) => (
                    <tr key={index} className="hover border">
                      <td>{formatDate(payment.payment_date)}</td>

                      <td>
                        <p className="text-[#49BBDF]">{payment.store_name}</p>
                      </td>
                      <td>
                        <p>{payment.amount ? `${payment.amount}円` : "N/A"}</p>
                      </td>
                      <td>
                        <p className="text-[#49BBDF]">
                          {payment.staff_name || "N/A"}
                        </p>
                      </td>
                      <td>
                        <Link
                          to="/dashboard/comments"
                          className="bg-[#49BBDF] text-white rounded-full text-center py-1 px-5"
                        >
                          コメント
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-5">
                      No payment history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeHistory;
