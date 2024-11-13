import ButtonPrimary from "../../components/ButtonPrimary";
import TitleBar from "../../components/TitleBar";
import { Link } from "react-router-dom";

const RegComplete = () => {
  return (
    <div className="">
      <TitleBar title={"登録完了"} />
      <h4 className="mt-[86px] mb-4 font-bold font-hiragino text-[20px] text-center w-full max-w-[430px] mx-auto">
        ご登録ありがとうございます！
        <br /> 応援するメンバーを探しましょう！
      </h4>

      <div className="fixed bottom-[130px] left-1/2 transform -translate-x-1/2 w-full max-w-[342px] px-4">
        <Link to={"/search"}>
          <ButtonPrimary
            btnText="メンバーを探す"
            style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-full rounded-full font-hiragino text-center py-[12px] font-bold text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default RegComplete;
