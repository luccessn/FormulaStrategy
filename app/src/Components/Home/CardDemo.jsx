/* eslint-disable react/jsx-no-target-blank */
"use client";

import React, { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useFetchData } from "../../Hooks/useFetchData";

export function ExpandableCardDemo() {
  const [data, error, isLoading] = useFetchData(
    "http://localhost:5000/server/gettracks"
  );
  console.log(data);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setActive(data[0]); // პირველი ელემენტი
    }
  }, [data]);

  const id = useId();

  return (
    <div>
      <div className="max-w-8xl mx-auto">
        {/* Swiper */}
        <Swiper
          rewind={true}
          slidesPerView={4}
          // pagination={{ clickable: true }}
          spaceBetween={20}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.map((card) => (
            <SwiperSlide key={card.name}>
              <motion.div
                layoutId={`card-${card.name}-${id}`}
                onClick={() => setActive(card)}
                className={`p-4 flex flex-col backdrop-blur-md  rounded-xl cursor-pointer transition ${
                  active?.name === card.name
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                }`}
              >
                <div className="flex gap-4 flex-col w-full">
                  <motion.div layoutId={`image-${card.name}-${id}`}>
                    <img
                      src={card.src}
                      alt={card.name}
                      className="h-60 w-full rounded-lg object-contain"
                    />
                  </motion.div>
                  <div className="flex justify-center items-center flex-col">
                    <motion.h3
                      layoutId={`title-${card.name}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base"
                    >
                      {card.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center text-sm"
                    >
                      {card.descr}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Active card info (ქვემოთ) */}
      <div className=" w-full  mt-20   ">
        {active && (
          <motion.div
            key={active.name}
            layoutId={`info-${active.name}-${id}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }} // გასწორებულია
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-8 flex gap-6 flex-row mx-auto shadow p-6 rounded-xl"
          >
            <img
              src={active.src}
              alt={active.name}
              className=" w-2/4 bg-black/80 h-full pr-10 object-contain border-r-[1px] border-zinc-800 "
            />
            <div className="w-1/2 flex flex-col gap-8 p-10 font-mono font-bold">
              <div className="flex flex-col md:flex-row justify-between  border-b p-10 border-zinc-700">
                <div className="flex flex-col gap-6 text-left ">
                  <h3 className="text-sm text-gray-400 font-sans ">
                    Track Name
                  </h3>
                  <h3 className="text-xl text-neutral-800 dark:text-neutral-200">
                    {active.name} / {active.country}
                  </h3>
                </div>
                <div className="flex flex-col gap-4 relative right-40">
                  <h3 className="text-sm text-gray-400 font-sans">
                    First race
                  </h3>
                  <h3 className="text-3xl pl-2 text-neutral-800 dark:text-neutral-200">
                    {active.firstGP}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between border-b p-10 border-zinc-700">
                <div className="flex flex-col gap-4 text-left ">
                  <h3 className="text-sm text-gray-400 font-sans ">
                    Fastest lap time
                  </h3>
                  <h3 className="text-3xl text-neutral-800 dark:text-neutral-200">
                    {active.fastestlap}
                  </h3>
                  <h3 className="text-sm text-gray-400 font-sans">
                    {active.fastestmn}
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm text-gray-400 font-sans">
                    Circuit Length
                  </h3>
                  <h3 className="text-6xl">{active.lenght}</h3>
                </div>
              </div>
              <h3 className="text-neutral-600 dark:text-neutral-400 text-xl mt-2">
                {active.descr}
              </h3>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
