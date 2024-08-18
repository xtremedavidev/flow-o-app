import { LineChart } from "../charts";

export const GeneralInsightsCard = () => {
  return (
    <div className="rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h2 className="text-xl font-medium">General Insight</h2>

      <div className="mt-[10px] text-xs font-normal text-[#BDBDBD]">
        Select Category
      </div>

      <hr className="my-[30px] w-full border-[1.5px] border-solid border-[#565656]/[0.35]" />

      <LineChart />
    </div>
  );
};
