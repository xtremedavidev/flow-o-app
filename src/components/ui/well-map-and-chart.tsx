"use client";

import { useState } from "react";
import { LocateWellCard, WellActivityCard } from "../cards";

export const WellChartAndMap = () => {
  const [showMap, setShowMap] = useState<boolean | null>(null);

  return (
    <div className="flex justify-between transition-all duration-300 ease-linear">
      <div
        className={`min-h-[350px] ${showMap === true ? "w-full" : "w-[45%]"}`}
      >
        <LocateWellCard showMap={showMap} setShowMap={setShowMap} />
      </div>

      <div className={` ${showMap === true ? "hidden w-0" : "w-[50%]"}`}>
        <WellActivityCard />
      </div>
    </div>
  );
};
