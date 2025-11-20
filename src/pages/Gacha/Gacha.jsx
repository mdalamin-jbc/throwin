import ButtonSecondary from "../../components/ButtonSecondary";
import TitleBar from "../../components/TitleBar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/images/home/logo.png";
import banner from "../../assets/images/gacha/gacha_banner.png";
import { Link } from "react-router-dom";

const Gacha = () => {
  return (
    <div className="mb-[120px]">
      <div className="">
        <TitleBar
          style="mb-0 w-full"
          back={""}
          title=""
          icon={
            <img className="w-[110px] items-center" src={logo} alt="logo" />
          }
        ></TitleBar>
        <div className="max-w-[430px] text-center mx-auto ">
          <img className="w-full" src={banner} alt="" />
        </div>
        <div className="mt-[11px] max-w-[430px] mx-auto text-center">
          <Link to="available_spins">
            <ButtonSecondary
              icon={<MdOutlineKeyboardArrowRight />}
              btnText="使用するガチャ券を選ぶ"
              style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
            />
          </Link>
          <Link to={"/gacha/tickets"}>
            <h5 className="mt-[11px] underline font-semibold text-[#434343]">
              TICKET BOXを見る
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gacha;
