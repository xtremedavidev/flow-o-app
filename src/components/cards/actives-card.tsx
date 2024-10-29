import { FC } from "react";
import { CircularProgressBar } from "../progress";

interface ActivesCardProps {
  icon: React.ReactNode;
  label: string;
  amount: string;
  desc: string;
  percentage: number;
}

export const ActivesCard: FC<ActivesCardProps> = ({
  icon,
  label,
  amount,
  desc,
  percentage,
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#1E3647] px-[14px] py-[6px] text-white @container lg:max-w-[237px]">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white/[0.19] p-[5.65px]">{icon}</div>
        <h2 className="text-[10px] font-normal @[9rem]:text-xs @[12rem]:text-sm">
          {label}
        </h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-normal leading-none @[10rem]:text-[32px]">
            {amount}
          </p>
          <p className="text-[8px] font-light @[9rem]:text-[10px]">{desc}</p>
        </div>

        <div>
          <CircularProgressBar percentage={Number(percentage.toFixed(2))} />
        </div>
      </div>
    </div>
  );
};
