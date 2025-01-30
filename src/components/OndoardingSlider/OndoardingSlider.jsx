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
  const { width, height } = useWindowSize();

  const handleNext = () => {
    if (swiperRef.current) {
      if (activeIndex === 2) {
        navigate("/login");
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex justify-center items-center overflow-hidden">
      <Helmet>
        <title>Throwin | Onboarding</title>
      </Helmet>
      <div
        className="shadow-xl text-center relative w-full min-h-[100dvh] flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Confetti width={width} height={height} />
        <div className="p-4 md:p-8 w-full h-full flex flex-col justify-center items-center relative">
          <Swiper
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full h-full mb-24"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {/* Slide 1 */}
            <SwiperSlide className="flex flex-col justify-center items-center min-h-[80dvh] px-4 md:px-16">
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="font-hiragino font-medium text-[clamp(16px,3vw,22px)] text-[#49BBDF] flex gap-3 justify-center">
                  \ <span>はじめに</span> /
                </h2>
                <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center">
                  <span>Throwinは</span>あなたの応援をカタチにできる <br />
                  投げ銭サービスです
                </h3>
                <img
                  src={img}
                  alt="Slide 1"
                  className="object-contain w-[min(90vw,350px)] mx-auto mt-4"
                />
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className="flex flex-col justify-center items-center min-h-[80dvh] px-4 md:px-16">
              <div className="flex flex-col items-center justify-center gap-4">
                <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center">
                  元気や、感動を
                  <br /> 与えてくれた人に、
                  <br />
                  スローインしましょう！
                </h3>
                <img
                  src={img2}
                  alt="Slide 2"
                  className="object-contain w-[min(90vw,350px)] mx-auto mt-4"
                />
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide className="flex flex-col justify-center items-center min-h-[80dvh] px-4 md:px-16">
              <div className="flex flex-col items-center justify-center gap-4">
                <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center">
                  ガチャ機能の説明
                </h3>
                <img
                  src={img2}
                  alt="Slide 3"
                  className="object-contain w-[min(90vw,350px)] mx-auto mt-4"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[342px] px-4"
          >
            <ButtonPrimary
              style="rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-full"
              btnText={activeIndex === 2 ? "始める" : "次へ"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;