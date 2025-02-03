import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import UseGetAvailableSpins from "../../hooks/Gacha/UseGetAvailableSpins";
import { Circles } from "react-loader-spinner"; // Ensure you have this installed

const GachaTwo = () => {
  const navigate = useNavigate();
  const { availableSpins, refetch, isLoading, isError } =
    UseGetAvailableSpins();
  console.log(availableSpins);

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

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Circles
              height="80"
              width="80"
              color="#49BBDF"
              ariaLabel="circles-loading"
              visible
            />
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load available spins
          </p>
        ) : availableSpins.length > 0 ? (
          <div className="grid gap-4 max-w-[351px] mx-auto">
            {availableSpins.map((ticket) => (
              <Link to={`ticket/${ticket.store_uid}`} key={ticket.store_uid}>
                <div className="flex justify-between items-center font-bold text-base border border-[#49BBDF] rounded-lg shadow-md px-5 py-4 bg-[#EAF8FD]">
                  <h3 className="text-[#585858]">{ticket.store_name}</h3>
                  <h4 className="flex gap-1 items-center border-l-2 border-[#49BBDF] border-dashed pl-5 text-[#585858]">
                    x<span className="text-2xl font-bold">{ticket.available_spin}</span>
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#585858]">No tickets available</p>
        )}

        <h2 className="font-bold text-center text-xl text-[#49BBDF] mt-8">
          使用するガチャ券を <br />
          選択しよう！
        </h2>
      </div>
    </div>
  );
};

export default GachaTwo;
