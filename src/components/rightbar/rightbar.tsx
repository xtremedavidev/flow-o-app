import { SemiPieChart } from "../charts";
import { ConditionsArr } from "@/libs";
import { ConditionsItem } from "../ui";
import { PressureAlertCard, SaveEnergyAlertCard } from "../cards";

export const Rightbar = () => {
  return (
    <div className="flex h-full w-full max-w-[30%] shrink-0 flex-col overflow-y-auto rounded-2xl bg-[#333333] px-[14px] py-[19px]">
      <div className="w-full rounded-2xl bg-[#CBCBCB]/[0.06] px-[18px] py-[14px]">
        <h2 className="mb-6 text-base font-medium">Updates</h2>

        <SemiPieChart />
        <div className="flex items-center justify-between">
          {ConditionsArr.map((condition, index) => (
            <ConditionsItem
              key={index}
              colour={condition.colour}
              status={condition.status}
            />
          ))}
        </div>
      </div>

      <h2 className="my-4 text-sm font-medium">Recent Alerts</h2>

      <div className="space-y-[10px]">
        <PressureAlertCard />

        <SaveEnergyAlertCard />
      </div>
    </div>
  );
};
