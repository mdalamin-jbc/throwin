import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";

const GachaTwo = () => {
  const navigate = useNavigate();

  const tikits = [
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
        <h3 className="text-center mt-[29px] mb-[18px] font-bold text-xl text-[#585858]">
          保有中のガチャ券
        </h3>
        <div className="grid gap-[18px] max-w-[351px] mx-auto">
          {tikits && tikits.length > 0 ? (
            tikits.map((ticket) => (
              <Link to={`ticket/${ticket.id}`} key={ticket.id}>
                <div className="flex justify-between font-bold text-xl shadow-md px-[21px] py-[30px]">
                  <h3 className="text-[#585858]">{ticket.name}</h3>
                  <h4>
                    x<span className="text-[45px]">{ticket.count}</span>
                  </h4>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-[#585858]">No tickets available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GachaTwo;
