import { FC } from "react";
import { CircularProgressBar } from "../progress";
import { AverageTimeIcon } from "../icons";
import { PiSpeedometerFill } from "react-icons/pi";

interface SECardProps {
  icon: React.ReactNode;
  label: string;
  average_downtime: string;
  average_resolution: string;
  percentage: number;
}

export const SystemEfficiencyCard: FC<SECardProps> = ({
  icon,
  label,
  average_downtime,
  average_resolution,
  percentage,
}) => {
  return (
    <div className="w-full min-w-[250px] rounded-2xl bg-[#1E3647] px-[14px] py-[6px] text-white">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white/[0.19] p-[5.65px]">{icon}</div>
        <h2 className="text-sm font-normal">{label}</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex shrink-0 flex-col justify-center gap-1">
          <div className="flex items-center gap-[5px] text-[10px] font-semibold text-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <AverageTimeIcon />
              <span>Average Downtime:</span>
            </div>
            <span className="font-normal">{average_downtime}</span>
          </div>
          <div className="flex items-center gap-[5px] text-[10px] font-semibold text-[#CCCCCC]">
            <div className="flex items-center gap-[5px]">
              <PiSpeedometerFill color="#828282" size={16} />
              <span>Average Resolution:</span>
            </div>
            <span className="font-normal">{average_resolution}</span>
          </div>
        </div>

        <div>
          <CircularProgressBar percentage={percentage} />
        </div>
      </div>
    </div>
  );
};
