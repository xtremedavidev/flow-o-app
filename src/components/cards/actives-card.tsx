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
    <div className="w-full max-w-[237px] rounded-2xl bg-[#1E3647] px-[14px] py-[6px] text-white">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white/[0.19] p-[5.65px]">{icon}</div>
        <h2 className="text-sm font-normal">{label}</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <p className="text-[32px] font-normal leading-none">{amount}</p>
          <p className="text-[10px] font-light">{desc}</p>
        </div>

        <div>
          <CircularProgressBar percentage={percentage} />
        </div>
      </div>
    </div>
  );
};
