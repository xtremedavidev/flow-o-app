"use client";

import { FC, useState } from "react";
import { LocateWellCard, WellActivityCard } from "../cards";
import { Site } from "@/types";

interface WellChartAndMapProps {
  sitesData: Site[] | Site;
}

export const WellChartAndMap: FC<WellChartAndMapProps> = ({ sitesData }) => {
  const [showMap, setShowMap] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col gap-8 transition-all duration-300 ease-linear lg:flex-row lg:justify-between lg:gap-0">
      <div
        className={` ${showMap === true ? "w-full" : showMap === false ? "hidden w-0" : "w-full lg:w-[45%]"}`}
      >
        <LocateWellCard
          showMap={showMap}
          setShowMap={setShowMap}
          sitesData={sitesData}
        />
      </div>

      <div
        className={`min-h-[350px] ${showMap === true ? "hidden w-0" : showMap === false ? "w-full" : "w-full lg:w-[50%]"}`}
      >
        <WellActivityCard showMap={showMap} setShowMap={setShowMap} />
      </div>
    </div>
  );
};
