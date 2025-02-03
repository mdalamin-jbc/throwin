import { useParams, useNavigate, Link } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import img from "../../assets/images/gacha/vending_1.png";
import ButtonSecondary from "../../components/ButtonSecondary";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import UseGetAvailableSpins from "../../hooks/Gacha/UseGetAvailableSpins";

const UseTicket = () => {
  const { store_uid } = useParams();
  const { availableSpins, refetch, isLoading, isError } =
    UseGetAvailableSpins();
  const navigate = useNavigate();
  console.log(availableSpins);
  console.log(store_uid);

  // Dummy ticket data for demonstration.
  const ticket = { id: store_uid, name: "Sample Ticket", count: 3 };

  if (!ticket) {
    return <p>Ticket not found</p>;
  }

  return (
    <div className="mb-[120px]">
      <TitleBar
        style="mb-0 w-full"
        back={
          <RiArrowLeftSLine
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            aria-label="Go Back"
          />
        }
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      />
      <div className="max-w-[430px] mx-auto ">
        <div className="flex justify-center">
          <img src={img} alt="" />
        </div>
        <div className="flex justify-between items-center font-bold text-base border border-[#49BBDF] rounded-lg shadow-md px-5 py-4 bg-[#EAF8FD]">
          <h3 className="text-[#585858]">{ticket.name}</h3>
          <h4 className="flex gap-1 items-center border-l-2 border-[#49BBDF] border-dashed  pl-5 text-[#585858]">
            x<span className="text-2xl font-bold">{ticket.count}</span>
          </h4>
        </div>
        <div className="mt-[43px] relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-5 w-[240px] rounded text-center">
            <h4 className="w-full text-[#36ABE0] relative rounded-full bg-white p-[2px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#3BAFE0] to-[#209AE1] rounded-full"></span>
              <span className="relative block bg-white rounded-full  px-4">
                ガチャ券を1枚使って
              </span>
            </h4>
          </div>

          <Link to={`processing`}>
            <ButtonSecondary
              icon={<MdOutlineKeyboardArrowRight />}
              btnText="回す！"
              style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] max-w-[342px] mx-auto rounded-full text-center py-[10px] font-bold text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UseTicket;
