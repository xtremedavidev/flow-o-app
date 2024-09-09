"use client";

import React, { FC } from "react";
import { PuslingMapChart } from "../charts";
import { GiCancel } from "react-icons/gi";

interface LocateWellCardProps {
  showMap: boolean | null;
  setShowMap: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const LocateWellCard: FC<LocateWellCardProps> = ({
  showMap,
  setShowMap,
}) => {
  return (
    <div className="h-full w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-[#E2E2E2]">Locate Well</h1>
          <p className="text-xs font-normal text-[#BCBCBC]">
            (Click on map to expand)
          </p>
        </div>
        {showMap && (
          <GiCancel
            onClick={() => setShowMap(null)}
            size={20}
            color="red"
            className="cursor-pointer"
          />
        )}
      </div>

      <div onClick={() => setShowMap(true)} className="relative h-full pt-3">
        <PuslingMapChart />
      </div>
    </div>
  );
};
