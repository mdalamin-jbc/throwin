import TitleBar from "../../components/TitleBar";
import logo from "../../assets/images/home/logo.png";
import gold_ticket from "../../assets/images/gacha/gold-ticket.png";

const GachaTickets = () => {
  return (
    <div>
      <TitleBar
        style="mb-0 w-full"
        back={""}
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      ></TitleBar>
      <div className="max-w-[430px] mx-auto mt-[22px]">
        <h4 className="text-center mb-3">景品BOX</h4>
        <div className="max-w-[390px] mx-auto grid grid-cols-2 gap-[18px]">
          <div>
            <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
              <img src={gold_ticket} className="max-w-[135px]" alt="" />
              <h5>居酒屋あ_A店</h5>
            </div>
          </div>
          <div>
            <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
              <img src={gold_ticket} className="max-w-[135px]" alt="" />
              <h5>居酒屋あ_A店</h5>
            </div>
          </div>
          <div>
            <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
              <img src={gold_ticket} className="max-w-[135px]" alt="" />
              <h5>居酒屋あ_A店</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GachaTickets;
