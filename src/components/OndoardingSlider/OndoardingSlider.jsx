import img from "../../assets/images/slider/Group 633190.png";
import bgImage from "../../assets/images/slider/Rectangle 1.png";
import effect from "../../assets/images/slider/effect.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required Swiper modules
import { Mousewheel, Pagination, Navigation, Keyboard } from "swiper/modules";
import ButtonPrimary from "../ButtonPrimary";

const OnboardingSlider = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active slide index

  const handleNext = () => {
    if (swiperRef.current) {
      // Navigate to "dashboard" if the active index is 2 (third slide)
      if (activeIndex === 2) {
        navigate("/gacha");
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center ">
      <div
        className="shadow-xl text-center relative h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="pt-[157px] md:pt-0 md:mt-20">
          <Swiper
            cssMode={true}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
          >
            <SwiperSlide className="flex justify-center items-center h-full w-full px-16">
              <div>
                <div className="flex justify-center">
                  <img
                    src={effect}
                    alt=""
                    className="absolute w-full md:w-auto -mt-3]]"
                  />
                </div>
                <div className="mt-6">
                  <h2 className="font-hiragino font-medium text-lg text-[#49BBDF] flex gap-3 justify-center mb-3">
                    \ <span>はじめに</span> /
                  </h2>
                  <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                    <span>Throwinは</span>活躍するスタッフとお客様を <br />
                    繋ぐ投げ銭サービスです
                  </h3>
                  <img
                    src={img}
                    alt="Slide 1"
                    className="object-contain w-[450px] lg:w-auto  "
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center h-full w-full px-16 mt-[10px]">
              <div>
                <div className="flex justify-center">
                  <img
                    src={effect}
                    alt=""
                    className="absolute w-full md:w-auto -mt-3]]"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                    元気や、感動を
                    <br /> 与えてくれたスタッフに
                    <br />
                    お礼をカタチ（投げ銭）にして
                    <br />
                    伝えることができます。
                  </h3>
                  <img
                    src={img}
                    alt="Slide 2"
                    className="object-contain w-[450px] lg:w-auto  "
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center h-full w-full px-16 mt-[39px]">
              <div>
                <div className="flex justify-center">
                  <img
                    src={effect}
                    alt=""
                    className="absolute w-full md:w-auto -mt-3]]"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                    まずはあなたの <br />
                    イチオシのスタッフを <br />
                    見つけてください！
                  </h3>
                  <img
                    src={img}
                    alt="Slide 3"
                    className="object-contain w-[450px] lg:w-auto  "
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {/* Custom Pagination Dots */}
          <div className="custom-pagination absolute inset-x-0 flex justify-center"></div>
          {/* Next Button with conditional text */}
          <button onClick={handleNext} className="next-button mt-6">
            <ButtonPrimary btnText={activeIndex === 2 ? "始める" : "次へ"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;
