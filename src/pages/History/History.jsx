import { Helmet } from "react-helmet";
import TitleBar from "../../components/TitleBar";
import useAxiosPrivate from "../../hooks/axiousPrivate";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { Circles } from "react-loader-spinner";
import img from "../../assets/images/store&staff/image.png";

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
  const { user } = useAuth();
  const accessToken = user?.access;
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments data", accessToken],
    queryFn: async () => {
      if (!accessToken) return [];
      const res = await axiosPrivate.get("/payment_service/payments/");
      return res.data.results;
    },
    enabled: !!accessToken, 
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

  return (
    <div className="mb-[120px]">
      <Helmet>
        <title>Throwin | History</title>
      </Helmet>
      <TitleBar style="mb-0 w-full" title="履歴" icon={null}></TitleBar>

      <div className="min-w-[375px] max-w-[430px] mx-auto px-[25px] mt-7 text-[#44495B] grid gap-5">
        {payments.map((payment) => (
          <div key={payment.id} className="flex items-center">
            <img
              className="w-[49px] h-[49px] rounded-full"
              src={img} // Placeholder image
              alt="user"
            />
            <div className="flex-1 flex justify-between items-center">
              <div className="ml-[13px]">
                <h3 className="font-bold text-sm">
                  {payment.customer_username} 店舗名
                </h3>
                <p className="font-normal text-sm text-[#9C9C9C]">
                  {formatDate(payment.created_at)}
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
