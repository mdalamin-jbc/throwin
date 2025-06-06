import { useLocation, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import video from "../../assets/video/vending_process.mp4";
import { useRef } from "react";

const Processing = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const location = useLocation();
  const ticketResponse = location.state?.ticketResponse;
  console.log(ticketResponse);

  // Function to navigate after video ends
  const handleVideoEnd = () => {
    navigate("got-ticket", { state: { ticketResponse } });
  };

  return (
    <div>
      <div className="max-w-[430px] mx-auto">
        <video
          ref={videoRef}
          src={video}
          className="overflow-auto"
          autoPlay
          onEnded={handleVideoEnd}
        />
        <div className=""></div>
      </div>
    </div>
  );
};

export default Processing;
