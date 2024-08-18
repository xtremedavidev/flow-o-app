import { PuslingMapChart } from "../charts";

export const LocateWellCard = () => {
  return (
    <div className="w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h1 className="text-base font-medium text-[#E2E2E2]">Locate Well</h1>

      <p className="text-xs font-normal text-[#BCBCBC]">
        (Click on map to expand)
      </p>

      <div className="relative mt-3">
        <PuslingMapChart />
      </div>
    </div>
  );
};
