import { Helmet } from "react-helmet";
import TitleBar from "../../components/TitleBar";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${day}/${month} ${hours}:${minutes}`;
};

const History = () => {
  const axiosPrivate = useAxiosPrivate();

  // Fetch payments data
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments data"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/payment_service/payment-histories/");
      return res.data.results.map((payment) => ({
        ...payment,
        created_at: payment.payment_date, // Map payment_date to created_at
        amount: Number(payment.amount), // Ensure amount is a number
        status: payment.status, // Add status to display
      }));
    },
    enabled: true,
  });

  console.log(payments);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#49BBDF"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  // Render the history page
  return (
    <div className="w-full mb-[120px]">
      <Helmet>
        <title>Throwin | History</title>
      </Helmet>
      <TitleBar style="mb-0 w-full" title="履歴" icon={null}></TitleBar>

      <div className="w-full max-w-[430px] mx-auto px-4 sm:px-6 mt-7 text-[#44495B] grid gap-2">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment.transaction_id}
              className="flex items-center  shadow-md rounded-lg p-4"
            >
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={
                  payment.staff_image?.medium
                    ? payment.staff_image?.medium
                    : "https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg"
                }
                alt="user"
              />
              <div className="flex-1 flex justify-between items-center ml-4">
                <div>
                  <h3 className="font-bold text-sm">
                    {payment.customer_name} 店舗名
                  </h3>
                  <p className="font-normal text-xs text-[#9C9C9C]">
                    {formatDate(payment.created_at)}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <h3 className="font-bold text-sm">
                    {payment.amount.toLocaleString()}円
                  </h3>
                  <p className="text-xs text-[#9C9C9C]">
                    Status: {payment.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-10 text-[#9C9C9C]">
            <p>No history available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
