"use client";
import React from "react";
import { Tabs } from "../../UI/tabs";

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

export function MapTabsDemo() {
  const tabs = MongoMepData.map((item) => ({
    title: item.title,
    value: item.value,
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-sm p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <p>{item.title}</p>
        <img
          src={item.img}
          alt={`${item.title} circuit map`}
          className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
      </div>
    ),
  }));

  return (
    <div className="h-[20rem] bg-red-600 md:h-[40rem] [perspective:1000px] relative  flex flex-col max-w-7xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}
