"use client";

import { FC } from "react";
import { ColumnChart } from "../charts";
import { GiCancel } from "react-icons/gi";
import { FetcherResult } from "@/utils";
import { WellActivityChartResp } from "@/types";

interface WellActivityProps {
  showMap: boolean | null;
  setShowMap: React.Dispatch<React.SetStateAction<boolean | null>>;
  wellChartData: FetcherResult<WellActivityChartResp[]> | { error: string };
}

export const WellActivityCard: FC<WellActivityProps> = ({
  showMap,
  setShowMap,
  wellChartData,
}) => {
  return (
    <div className="h-full w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-[#E2E2E2]">
            Well Activity
          </h1>

          <p className="text-xs font-normal text-[#BCBCBC]">
            Active Wells x days
          </p>
        </div>

        <div
          className={`text-[10px] font-normal text-[#BDBDBD] ${showMap === false ? "flex items-center gap-6" : ""}`}
        >
          <span>Change range</span>
          {showMap === false && (
            <GiCancel
              onClick={() => setShowMap(null)}
              size={20}
              color="red"
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <div onClick={() => setShowMap(false)} className="relative h-full pt-3">
        <ColumnChart wellChartData={wellChartData} />
      </div>
    </div>
  );
};
