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
        className="shadow-xl text-center relative w-full min-h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          minHeight: "full",
        }}
      >
        <div className=" ">
          <div className="">
            <Confetti width={width} height={height} />
            <div className="pt-6  relative mt-[90px] md:mt-0">
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
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                <SwiperSlide className="flex justify-center items-center h-full w-full px-1 md:px-16">
                  <div className="relative w-full px-[68px]">
                    {/* <img src={effect} alt="Effect" className="absolute w-full " /> */}

                    <div className="mt-[70px] md:mt-0">
                      <h2 className="font-hiragino font-medium text-lg  text-[#49BBDF] flex gap-3 justify-center mb-3">
                        \ <span>はじめに</span> /
                      </h2>
                      <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                        <span>Throwinは</span>活躍するスタッフとお客様を <br />
                        繋ぐ投げ銭サービスです
                      </h3>
                      <img
                        src={img}
                        alt="Slide 1"
                        className="object-contain w-full md:w-[256px] mx-auto"
                      />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="flex justify-center items-center h-full w-full px-6 md:px-16 mt-[10px]">
                  <div className="relative">
                    {/* <img
                    src={effect}
                    alt="Effect"
                    className="absolute w-full md:w-auto -mt-3"
                  /> */}
                    <div className="mt-28 md:mt-0">
                      <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                        元気や、感動を
                        <br /> 与えてくれたスタッフに
                        <br />
                        お礼をカタチ（投げ銭）にして
                        <br />
                        伝えることができます。
                      </h3>
                      <img
                        src={img2}
                        alt="Slide 2"
                        className="object-contain w-[250px] sm:w-[350px] lg:w-auto mx-auto"
                      />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="flex justify-center items-center h-full w-full px-6 md:px-16 mt-[39px]">
                  <div className="relative">
                    {/* <img
                    src={effect}
                    alt="Effect"
                    className="absolute w-full md:w-auto -mt-3"
                  /> */}
                    <div className="mt-[180px] md:mt-0">
                      <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                        ガチャ機能の説明
                      </h3>
                      <img
                        src={img2}
                        alt="Slide 3"
                        className="object-contain w-[250px] sm:w-[350px] lg:w-auto mx-auto"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Pagination dots positioned between image and button */}
              <div className="custom-pagination inset-x-0 flex justify-center my-8 "></div>

              {/* Next Button positioned below pagination */}
              <button
                onClick={handleNext}
                className="next-button fixed bottom-5 left-1/2 transform -translate-x-1/2 mb-9"
              >
                <ButtonPrimary
                  style="rounded-full bg-gradient-to-r from-[#65D0F2] to-[#2399F4] w-[342px]"
                  btnText={activeIndex === 2 ? "始める" : "次へ"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;
