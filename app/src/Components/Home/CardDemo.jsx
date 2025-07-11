"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../UI/use-outside-click";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
const cards = [
  {
    title: "Monaco",
    description: "monaco",
    src: "https://substackcdn.com/image/fetch/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F55d59502-51db-4f34-bfbc-2215360f9c10_895x539.png",
    ctaText: "Read More",
    ctaLink: "https://example.com/monaco",
    content:
      "The Monaco Grand Prix is one of the most prestigious and challenging races in Formula 1. Held on the narrow streets of Monte Carlo, the circuit tests driver skill and precision. It is known for its glamour, rich history, and breathtaking views.",
  },
  {
    title: "Australia GP",
    description: "australia",
    src: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_771/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit",
    ctaText: "Read More",
    ctaLink: "https://example.com/australia",
    content:
      "The Australian Grand Prix is traditionally the opening race of the Formula 1 season. Held in Melbourne's Albert Park, the race is known for its enthusiastic crowd, fast layout, and unpredictable weather conditions that often add excitement.",
  },
  {
    title: "Monza",
    description: "monza",
    src: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.webp",
    ctaText: "Read More",
    ctaLink: "https://example.com/monza",
    content:
      "The Monza Circuit, also known as the Temple of Speed, is one of the fastest tracks in Formula 1. Located in Italy, it has a rich history and is beloved by fans of the Scuderia Ferrari. The circuit is famous for its long straights and passionate tifosi.",
  },
];

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [active]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            layout={false}
            className="fixed inset-0 bg-black/20 h-full w-full z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2  lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[900px] h-full  md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden "
            >
              {/* md:h-fit */}
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-96 sm:rounded-tr-lg sm:rounded-tl-lg object-contain"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4 ">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p>{active.content}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="max-w-max">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {/* <ul className="max-w-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4 "> */}
          {cards.map((card) => (
            <SwiperSlide>
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={card.title}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800  rounded-xl cursor-pointer"
              >
                <div className="flex gap-4 flex-col w-full">
                  <motion.div layoutId={`image-${card.title}-${id}`}>
                    <img
                      src={card.src}
                      alt={card.title}
                      className="h-96  w-full rounded-lg object-contain "
                    />
                  </motion.div>
                  <div className="flex justify-center items-center flex-col">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
          {/* </ul> */}
        </Swiper>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
