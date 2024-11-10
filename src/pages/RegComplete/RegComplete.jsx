import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { Link } from "react-router-dom";

const RegComplete = () => {
  return (
    <div className="w-[390px] mx-auto">
      <TitleBar title={"登録完了"} />
      <h4 className="mt-[86px] mb-4 font-bold font-hiragino text-[20px] text-center">
        ご登録ありがとうございます！
        <br /> 応援するメンバーを探しましょう！
      </h4>

      <button className="fixed bottom-[130px]">
        <Link to={"/search"}>
          <ButtonPrimary
            btnText="メンバーを探す"
            style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px] rounded-full font-hiragino text-center py-[12px] font-bold text-white"
          />
        </Link>
      </button>
    </div>
  );
};

export default RegComplete;
