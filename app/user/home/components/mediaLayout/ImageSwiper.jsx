import { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/keyboard";
import "swiper/css/zoom";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Keyboard, Zoom } from "swiper/modules";

import { Image } from "@nextui-org/react";

const ImageSwiper = ({ data, selectedImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.slideTo(selectedImage, 400, false);
  }, [selectedImage]);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="h-full flex justify-center items-center">
        <Swiper
          ref={swiperRef}
          style={{
            "height": "100%",
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          keyboard={{
            enabled: true,
          }}
          zoom={true}
          modules={[FreeMode, Navigation, Thumbs, Keyboard, Zoom]}
          className="mt-48 top-0"
        >
          {data.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="h-full flex justify-center items-center swiper-zoom-container">
                  <Image
                    //   isZoomed
                    removeWrapper
                    key={index}
                    width={450}
                    // height={1000}
                    sizes={
                      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    }
                    radius={"none"}
                    loading={"lazy"}
                    alt={`Media Layout ${index}`}
                    src={image}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={"auto"}
        freeMode={true}
        watchSlidesProgress={true}
        keyboard={{
          enabled: true,
        }}
        modules={[FreeMode, Navigation, Thumbs, Keyboard]}
        className="thumbs bottom-0 h-24 "
      >
        {data.map((image, index) => {
          return (
            <SwiperSlide key={index} style={{ width: "96px" }}>
              <div className="flex justify-center items-center rounded-lg border-2 border-darkgrey-default bg-lightgrey-default/40 overflow-clip h-full w-full">
                <Image
                  isZoomed
                  removeWrapper
                  key={index}
                  //   width={50}
                  height={100}
                  //   sizes={
                  //     "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  //   }
                  radius={"none"}
                  loading={"lazy"}
                  alt={`Media Layout ${index}`}
                  src={image}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
