"use client";
import { WorldMap } from "../UI/WorldMap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
export function WorldMapDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-200px 0px 0px 0px",
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  return (
    <div className="   w-full ">
      <WorldMap
        dots={[
          {
            start: { lat: -40.8497, lng: 144.968, label: "Australia GP" },
          },
          {
            start: { lat: 7.0325, lng: 55.5106, label: "Bahrain GP" },
          },
          {
            start: { lat: 9.6333, lng: 43.1047, label: "Saudi Arabia GP" },
          },
          {
            start: { lat: 24.3725, lng: 46.8533, label: "Azerbaijan GP" },
          },
          {
            start: { lat: 10.958, lng: -82.238, label: "Miami GP" },
          },
          {
            start: { lat: 32.3531, lng: 10.7147, label: "Imola GP" },
          },
          {
            start: { lat: 36.7347, lng: 10.4206, label: "Monaco GP" },
          },
          {
            start: { lat: 25.57, lng: -2.2611, label: "Spain GP" },
          },
          {
            start: { lat: 50.5058, lng: -110.5267, label: "Canada GP" },
          },
          {
            start: { lat: 38.2197, lng: 17.7647, label: "Austria GP" },
          },
          {
            start: { lat: 43.071, lng: -2.016, label: "Silverstone GP" },
          },
          {
            start: { lat: 32.5789, lng: 20.2486, label: "Hungary GP" },
          },
          {
            start: { lat: 35.7347, lng: 2.9714, label: "Belgium GP" },
          },
          {
            start: { lat: 40.7347, lng: 6.5403, label: "Netherlands GP" },
          },
          //   {
          //     start: { lat: 45.6156, lng: 9.2811, label: "Monza GP" },
          //   },
          {
            start: { lat: 25.2914, lng: 103.8641, label: "China GP" },
          },
          {
            start: { lat: -16.2914, lng: 103.8641, label: "Singapore GP" },
          },
          {
            start: { lat: 22.8392, lng: 140.5377, label: "Japan GP" },
          },
          {
            start: { lat: 30.1328, lng: -97.6359, label: "USA GP" }, //
          },
          {
            start: { lat: 8.404, lng: -103.0901, label: "Mexico GP" },
          },
          {
            start: { lat: -28.7036, lng: -50.6997, label: "Brazil GP" },
          },
          {
            start: { lat: 36.1255, lng: -115.1711, label: "Las Vegas GP" },
          },
          {
            start: { lat: 3.378, lng: 47.4828, label: "Qatar GP" },
          },
          {
            start: { lat: 3.4672, lng: 57.6031, label: "Abu Dhabi GP" },
          },
        ]}
      />
      <div className="top-shadow absolute left-0 top-12 w-full h-[180px] bg-gradient-to-b from-black to-transparent"></div>
      <div className="bottom-shadow relative -top-[3em] left-0 -bottom-1 w-full h-[80px] bg-gradient-to-t from-black to-transparent "></div>

      <div className="max-w-7xl mx-auto text-center" ref={ref}>
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
    </div>
  );
}
