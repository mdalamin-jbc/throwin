import TitleBar from "../../components/TitleBar";
import logo from "../../assets/images/home/logo.png";
import gold from "../../assets/images/gacha/lation_gold_card.png";
import silver from "../../assets/images/gacha/lation_silver_card.png";
import bronze from "../../assets/images/gacha/lation_bronze_card.png";
import UseGetSpins from "../../hooks/Gacha/UseGetSpins";
import { Circles } from "react-loader-spinner";

const GachaTickets = () => {
  const { availableTickets, refetch, data, isLoading, isError } = UseGetSpins();

  console.log("Available Tickets:", availableTickets);

  return (
    <div className="mb-[120px]">
      <TitleBar
        style="mb-0 w-full"
        back={""}
        title=""
        icon={<img className="w-[110px] items-center" src={logo} alt="logo" />}
      />
      <div className="max-w-[430px] mx-auto mt-[22px]">
        <div className="mx-[10px]">
          <h4 className="text-center mb-3">TICKET BOX</h4>

          {/* ✅ Show Loader When Fetching Data */}
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
            // ✅ Show Error Message If Fetching Fails
            <p className="text-center text-red-500">
              Failed to load tickets. Please try again.
            </p>
          ) : availableTickets.length === 0 ? (
            // ✅ Show Message If No Tickets Are Available
            <p className="text-center text-gray-500">No tickets available.</p>
          ) : (
            // ✅ Render Available Tickets
            <div className="max-w-[390px] mx-auto grid grid-cols-2 gap-[18px]">
              {availableTickets.map((ticket) => {
                // Determine the ticket image based on gacha_kind
                const ticketImage =
                  ticket.gacha_kind === "gold"
                    ? gold
                    : ticket.gacha_kind === "silver"
                    ? silver
                    : bronze;

                return (
                  <div key={ticket.uid} className="flex justify-center">
                    <div className="bg-[#49BBDF14] rounded-full w-[181px] h-[181px] flex justify-center items-center flex-col">
                      <img
                        src={ticketImage}
                        className="w-[calc(100%-20px)]"
                        alt="Ticket"
                      />
                      <h5 className="-mt-3 text-[#434343]">
                        {ticket.store_name}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GachaTickets;
