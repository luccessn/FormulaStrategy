import React from "react";
import { WorldMapDemo } from "../../Components/Home/WorldMapDemo";
import { MapTabsDemo } from "../../Components/Home/MapTabs/MapTabsDemo";
import { ExpandableCardDemo } from "../../Components/Home/CardDemo";
import { WindTunnelDemo } from "../../Components/Home/Wind/FullWind";

export const Home = () => {
  return (
    <div className="h-[10000px] flex flex-col gap-40 text-white text-3xl">
      <WorldMapDemo />
      {/* <MapTabsDemo /> */}
      <div className="">
        <ExpandableCardDemo />
      </div>
      <div className="sketchfab-embed-wrapper bg-black/40 w-[1050px] h-[500px]">
        <iframe
          title="McLaren MP4/5 || Formula 1"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          // src="https://sketchfab.com/models/3059d4532ecd48ca8da41e1cac971f22/embed?autospin=0.5&autostart=1&camera=0&transparent=1"
          src="https://sketchfab.com/models/3059d4532ecd48ca8da41e1cac971f22/embed?autospin=0.5&autostart=1&transparent=1"
          height="480"
          className=" w-full h-full "
        >
          {" "}
        </iframe>
        {/* <p
          style={{
            fontSize: "13px",
            fontWeight: "normal",
            margin: "5px",
            color: "#4A4A4A",
          }}
        >
          <a
            href="https://sketchfab.com/3d-models/mclaren-mp45-formula-1-3059d4532ecd48ca8da41e1cac971f22?utm_medium=embed&utm_campaign=share-popup&utm_content=3059d4532ecd48ca8da41e1cac971f22"
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: "bold", color: "#1CAAD9" }}
          >
            McLaren MP4/5 || Formula 1
          </a>{" "}
          by{" "}
          <a
            href="https://sketchfab.com/dark_igorek?utm_medium=embed&utm_campaign=share-popup&utm_content=3059d4532ecd48ca8da41e1cac971f22"
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: "bold", color: "#1CAAD9" }}
          >
            dark_igorek
          </a>{" "}
          on{" "}
          <a
            href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=3059d4532ecd48ca8da41e1cac971f22"
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: "bold", color: "#1CAAD9" }}
          >
            Sketchfab
          </a>
        </p> */}
      </div>
      <div class="sketchfab-embed-wrapper">
        {" "}
        <iframe> </iframe>{" "}
      </div>
      <WindTunnelDemo />
    </div>
  );
};
