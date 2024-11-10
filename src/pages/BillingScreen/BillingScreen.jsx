import TitleBar from "../../components/TitleBar";
import logo from "../../assets/images/home/logo.png";

const BillingScreen = () => {
  return (
    <div>
      <div>
        <TitleBar
          style=""
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo " />
          }
        ></TitleBar>
      </div>
    </div>
  );
};

export default BillingScreen;
