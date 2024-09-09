"use client";

import { ColumnChart } from "../charts";

export const WellActivityCard = () => {
  return (
    <div className="w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-[#E2E2E2]">
            Well Activity
          </h1>

          <p className="text-xs font-normal text-[#BCBCBC]">
            Active Wells x days
          </p>
        </div>

        <div className="text-[10px] font-normal text-[#BDBDBD]">
          Change range
        </div>
      </div>

      <ColumnChart />
    </div>
  );
};
