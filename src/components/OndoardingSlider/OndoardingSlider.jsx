import img from "../../assets/images/slider/Group 633190.png";
import img2 from "../../assets/images/slider/img2.png";
import bgImage from "../../assets/images/slider/Rectangle 1.png";

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
import { Helmet } from "react-helmet";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "./onboarding.Style.css";

const OnboardingSlider = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current) {
      if (activeIndex === 2) {
        navigate("/login");
      } else {
        swiperRef.current.slideNext();
      }
    }
  };
  const { width, height } = useWindowSize();

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center overflow-hidden">
      <Helmet>
        <title>Throwin | Onboarding</title>
      </Helmet>
      <div
        className="shadow-xl text-center relative w-full min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Confetti width={width} height={height} />
        <div className="p-8 w-full flex flex-col justify-center items-center">
          <Swiper
            cssMode={true}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {/* Slide 1 */}
            <SwiperSlide className="flex flex-col justify-center items-center h-[84vh] px-4 md:px-16">
              <h2 className="font-hiragino font-medium text-[clamp(16px,3vw,22px)] text-[#49BBDF] flex gap-3 justify-center mb-3">
                \ <span>はじめに</span> /
              </h2>
              <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center mb-8">
                <span>Throwinは</span>あなたの応援をカタチにできる <br />
                投げ銭サービスです
              </h3>
              <img
                src={img}
                alt="Slide 1"
                className="object-contain w-[min(90vw,350px)] mx-auto"
              />
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className="flex flex-col justify-center items-center h-[85vh] px-4 md:px-16">
              <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center mb-8">
                元気や、感動を
                <br /> 与えてくれた人に、
                <br />
                スローインしましょう！
              </h3>
              <img
                src={img2}
                alt="Slide 2"
                className="object-contain w-[min(90vw,350px)] mx-auto"
              />
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide className="flex flex-col justify-center items-center h-[92vh] px-4 md:px-16">
              <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center mb-8">
                ガチャ機能の説明
              </h3>
              <img
                src={img2}
                alt="Slide 3"
                className="object-contain w-[min(90vw,350px)] mx-auto"
              />
            </SwiperSlide>
          </Swiper>

          {/* Pagination (Fix: Make sure Swiper assigns pagination here) */}
          <div className="custom-pagination absolute bottom-[15vh]   left-1/2 transform -translate-x-1/2 flex gap-3"></div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="next-button absolute bottom-[5vh] left-1/2 transform -translate-x-1/2"
          >
            <ButtonPrimary
              style="rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[min(90vw,342px)]"
              btnText={activeIndex === 2 ? "始める" : "次へ"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;
