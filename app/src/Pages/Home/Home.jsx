import React from "react";
import { WorldMapDemo } from "../../Components/Home/WorldMapDemo";
import { MapTabsDemo } from "../../Components/Home/MapTabs/MapTabsDemo";
import { TestSwiper } from "../../Components/Home/testSwiper";
import { ExpandableCardDemo } from "../../Components/Home/CardDemo";

export const Home = () => {
  return (
    <div className="h-[10000px] flex flex-col gap-10 text-white text-3xl">
      <WorldMapDemo />
      {/* <MapTabsDemo /> */}
      <ExpandableCardDemo />
      <TestSwiper />
    </div>
  );
};
