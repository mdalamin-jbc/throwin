import { Helmet } from "react-helmet";
import TitleBar from "../../components/TitleBar";
import logo from "../../assets/images/home/logo.png";
import effect from "../../assets/images/billing/billingEffect.png";
import UseGetByStaffName from "../../hooks/UseGetByStaffName";
import { Link, useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Circles } from "react-loader-spinner";

const ChargeCompleted = () => {
  const { username } = useParams();
  const { staff, isLoading, isError } = UseGetByStaffName(username);
  console.log(isError);

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
    <div className="mb-[120px] ">
      <Helmet>
        <title>Throwin | Billing Page</title>
      </Helmet>
      <div>
        <TitleBar
          title=""
          style="mb-0 w-full"
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo" />
          }
        />
        {/* Effect image */}
        <div className="absolute  left-0 right-0 flex justify-center ">
          <img
            src={effect}
            alt="effect"
            className="min-w-[375px] max-w-[100%]"
          />
        </div>
      </div>
      <div className="min-w-[375px] mx-auto text-[#44495B] mt-[43px] ">
        <div className="text-center ">
          <h3 className="font-bold text-[28px]">{staff.name}</h3>
          <img
            className="rounded-full w-[163px] mx-auto mt-3"
            src="https://shorturl.at/XqwIr"
            alt=""
          />
          <h3 className="font-bold text-[28px] w-[85%] mx-auto mt-6 mb-4">
            ありがとうございます！ スローインしました
          </h3>
          <Link className="text-[#5297FF] font-bold text-sm" to="/history">
            <p>履歴を見る</p>
          </Link>
        </div>
      </div>
      {/* Button at the bottom */}
      <Link to="/history">
        <div className="absolute bottom-[114px] w-full px-6">
          <ButtonPrimary
            style="flex justify-center w-full rounded-full font-hiragino py-[12px] font-bold text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4]"
            btnText="他のメンバーを探す"
          />
        </div>
      </Link>
    </div>
  );
};

export default ChargeCompleted;
