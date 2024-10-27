import img from "../../assets/images/slider/Group 633190.png";
import bgImage from "../../assets/images/slider/Rectangle 1.png";
import effect from "../../assets/images/slider/effect.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
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

  const handleNext = () => {
    if (swiperRef.current) {
      if (swiperRef.current.activeIndex === 2) {
        navigate("/dashboard"); // Navigate to "dashboard" after the third slide
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <div
        className=" p-6  shadow-xl text-center relative w-[291px] h-screen "
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="mt-[157px]">
          <div className="flex justify-center ite ">
            <img src={effect} alt="" className="absolute h-[239.04px]" />
          </div>
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
          >
            <SwiperSlide className="flex justify-center items-center h-full">
              <div className="mt-3">
                <h2 className="font-hiragino font-medium text-lg text-[#49BBDF] flex gap-3 justify-center mb-3">
                  \ <span>はじめに</span> /
                </h2>
                <h3 className="grid font-hiragino font-semibold text-[19px] text-[#44495B] leading-8 mb-11">
                  <span>Throwinは</span>活躍するスタッフとお客様を
                  繋ぐ投げ銭サービスです
                </h3>
                <img src={img} alt="Slide 1" className="object-contain over" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center h-full">
              <img src={img} alt="Slide 2" className="object-contain" />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center h-full">
              <img src={img} alt="Slide 3" className="object-contain" />
            </SwiperSlide>
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="custom-pagination absolute inset-x-0 bottom-20 flex justify-center"></div>

          {/* Next Button */}
          <button onClick={handleNext} className="next-button mt-6">
            <ButtonPrimary btnText="次へ" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;
