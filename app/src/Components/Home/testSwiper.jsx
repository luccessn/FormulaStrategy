import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const MongoMepData = [
  {
    title: "Monaco",
    value: "monaco",
    img: "https://substackcdn.com/image/fetch/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F55d59502-51db-4f34-bfbc-2215360f9c10_895x539.png",
  },
  {
    title: "Australia GP",
    value: "australiagp",
    img: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_771/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit",
  },
  {
    title: "Monca",
    value: "monca",
    img: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.webp",
  },
];

export const TestSwiper = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div className="w-full">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {MongoMepData.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[500px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {MongoMepData.map((item, index) => (
            <SwiperSlide key={index}>
              <img className="h-[200px]" src={item.img} alt={item.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
