import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import { RiArrowLeftSLine } from "react-icons/ri";
import logo from "../../assets/images/home/logo.png";
import img1 from "../../assets/images/gacha/gachaImg1.png";
import img2 from "../../assets/images/gacha/gachaimg2.png";
import { useState, useEffect } from "react";

const Processing = () => {
  const navigate = useNavigate();
  const [showSecondImage, setShowSecondImage] = useState(false);

  // Handle image transition after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondImage(true);
    }, 2000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
  }, []);

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
          {showSecondImage ? (
            <Link to="got-ticket">
              <img src={img2} className="w-[300px]" alt="Gacha Result" />
            </Link>
          ) : (
            <img src={img1} className="w-[370px]" alt="Processing..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Processing;
