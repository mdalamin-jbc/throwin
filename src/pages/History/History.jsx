import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TitleBar from "../../components/TitleBar";
import useAxiosPrivate from "../../hooks/axiousPrivate";

const History = () => {
  const axiosPrivate = useAxiosPrivate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axiosPrivate.get("/payment_service/payments/");
        setPayments(response.data.results); // Save the results into state
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPaymentHistory();
  }, [axiosPrivate]);

  return (
    <div className="mb-[120px]">
      <Helmet>
        <title>Throwin | History</title>
      </Helmet>
      <TitleBar style="mb-0 w-full" title="履歴" icon=""></TitleBar>

      <div className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5">
        {payments.map((payment) => (
          <div key={payment.id} className="flex items-center">
            <img
              className="w-[49px] rounded-full"
              src="https://i.postimg.cc/HLdQr5yp/5e3ca18b58c181ccc105ca95163e891c.jpg" // Placeholder image
              alt="user"
            />
            <div className="flex-1 flex justify-between items-center">
              <div className="ml-[13px]">
                <h3 className="font-bold text-sm">
                  {payment.customer_username} 店舗名
                </h3>
                <p className="font-normal text-sm text-[#9C9C9C]">
                  {payment.created_at}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <h3 className="font-bold text-sm">
                  {Number(payment.amount).toLocaleString()}円
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
