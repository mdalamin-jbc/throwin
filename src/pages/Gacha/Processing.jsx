import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import video from "../../assets/video/vending_process.mp4";
import { useRef } from "react";

const Processing = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Function to navigate after video ends
  const handleVideoEnd = () => {
    navigate("got-ticket");
  };

  return (
    <div>
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
      <div className="max-w-[430px] mx-auto">
        <div className="flex justify-center">
          <video
            ref={videoRef}
            src={video}
            className=""
            autoPlay
            onEnded={handleVideoEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default Processing;
