import { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

import { Image } from "@nextui-org/react";

// ### TODO Add zoom functionality
// ### TODO Add keyboard controls when sliding images

const ImageSwiper = ({ data, selectedImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.slideTo(selectedImage, 400, false);
  }, [selectedImage]);

  return (
    <div className="w-full max-h-screen ">
      <Swiper
        ref={swiperRef}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Zoom, FreeMode, Navigation, Thumbs]}
        className="my-12 top-0"
        zoom={true}
      >
        {data.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
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
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={"auto"}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
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
