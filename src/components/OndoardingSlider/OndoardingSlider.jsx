import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Navigation, Keyboard } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ButtonPrimary from "../ButtonPrimary";

// Import your images
import img from "../../assets/images/slider/Group 633190.png";
import img2 from "../../assets/images/slider/img2.png";
import bgImage from "../../assets/images/slider/Rectangle 1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

  // Custom dot indicator component
  const CustomDots = () => (
    <div className="flex gap-3 md:gap-3 justify-center">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => swiperRef.current?.slideTo(index)}
          className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
            activeIndex === index
              ? 'bg-gradient-to-r from-[#65D0F2] to-[#2399F4] scale-125'
              : 'bg-gray-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

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
        <div className="p-4 md:p-8 w-full h-full flex flex-col justify-between items-center">
          <Swiper
            pagination={false}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full flex-1 mb-8" // Added margin bottom here
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {/* Slide 1 */}
            <SwiperSlide className="flex flex-col justify-center items-center px-4 md:px-16">
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
                  className="object-contain w-[min(70vw,350px)] mx-auto"
                />
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className="flex flex-col justify-center items-center px-4 md:px-16">
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
                  className="object-contain w-[min(70vw,350px)] mx-auto"
                />
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide className="flex flex-col justify-center items-center px-4 md:px-16">
              <div className="flex flex-col items-center justify-center gap-4">
                <h3 className="text-[clamp(14px,4vw,20px)] text-[#44495B] leading-8 text-center">
                  ガチャ機能の説明
                </h3>
                <img
                  src={img2}
                  alt="Slide 3"
                  className="object-contain w-[min(70vw,350px)] mx-auto"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="w-full flex flex-col items-center gap-8">
            {/* Custom Dots */}
            <CustomDots />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full max-w-[342px] px-4"
            >
              <ButtonPrimary
                style="rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-full"
                btnText={activeIndex === 2 ? "始める" : "次へ"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;