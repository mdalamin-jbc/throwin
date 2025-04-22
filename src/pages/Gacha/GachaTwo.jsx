import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import UseGetAvailableSpins from "../../hooks/Gacha/UseGetAvailableSpins";

const GachaTwo = () => {
  const navigate = useNavigate();
  const { availableSpins, refetch, isLoading, isError } =
    UseGetAvailableSpins();
  console.log(availableSpins);

  const tickets = [
    { id: 1, name: "居酒屋あ_A店", count: 4 },
    { id: 2, name: "バスケチームB", count: 1 },
    { id: 3, name: "バスケチームD", count: 2 },
  ];

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
      <div>
        <h3 className="text-center mt-[29px] mb-[18px] font-semibold text-xl text-[#585858]">
          保有中のガチャ券
        </h3>

        <div className="grid gap-4 max-w-[351px] mx-auto">
          {availableSpins  ? (
            availableSpins.map((ticket) => (
              <Link to={`ticket/${ticket.id}`} key={ticket.id}>
                <div className="flex justify-between items-center font-bold text-base border border-[#49BBDF] rounded-lg shadow-md px-5 py-4 bg-[#EAF8FD]">
                  <h3 className="text-[#585858]">{ticket.name}</h3>
                  <h4 className="flex gap-1 items-center border-l-2 border-[#49BBDF] border-dashed  pl-5 text-[#585858]">
                    x<span className="text-2xl font-bold">{ticket.count}</span>
                  </h4>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-[#585858]">No tickets available</p>
          )}
        </div>
        <h2 className="font-bold text-center text-xl text-[#49BBDF] mt-8">
          使用するガチャ券を <br />
          選択しよう！
        </h2>
      </div>
    </div>
  );
};

export default GachaTwo;
