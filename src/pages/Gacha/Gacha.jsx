import ButtonSecondary from "../../components/ButtonSecondary";
import TitleBar from "../../components/TitleBar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/images/home/logo.png";
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
        <div className="max-w-[430px] text-center mx-auto bg-[#D9D9D9]  mt-2">
          <h4 className=" max-w-[279px] mx-auto font-bold text-[#585858] text-[25px] pt-[87px]">
            ガチャの説明用バナー <br />
            ・店舗(チーム)別に得たガチャ券を使えること
            <br />
            ・景品は金銀銅チケッ <br />
            トの3種類
            <br />
            ・チケットと交換できるものは店舗（チーム）に聞いてね
          </h4>
          <p className="font-semibold text-[#000000] pb-[14px] mt-[86px]">
            提供割合
          </p>
        </div>
        <div className="mt-[11px] max-w-[430px] mx-auto text-center">
          <Link to="/gacha2">
            <ButtonSecondary
              icon={<MdOutlineKeyboardArrowRight />}
              btnText="使用するガチャ券を選ぶ"
              style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
            />
          </Link>
          <h5 className="mt-[11px] underline font-semibold text-[#434343]">
            ゲットしたTICKET一覧
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Gacha;
