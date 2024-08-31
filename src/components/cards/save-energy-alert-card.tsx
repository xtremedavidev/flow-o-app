import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { GotoerIfLink } from "../common";
import { FC } from "react";

interface PressureAlertCardProps {
  alertID: string;
}

export const SaveEnergyAlertCard: FC<PressureAlertCardProps> = ({
  alertID,
}) => {
  return (
    <GotoerIfLink url={`/action-center/${alertID}`}>
      <div className="cursor-pointer rounded-[10px] border-2 border-solid border-white/[0.09] bg-gradient-to-tr from-[#FF00B8]/[0.09] to-[#FF00C7]/[0.09] px-[10px] py-2 @container">
        <div className="flex items-center justify-between gap-4">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-[10px]">
            <FaHeart size={16} color="#24122D" />
          </div>
          <div className="@md:w-full">
            <h2 className="text-xs font-bold @md:text-base">
              Save more energy for later
            </h2>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[8px] font-normal text-white/50 @md:text-xs">
                2024-06-28 10:32 AM
              </span>
              <span className="flex shrink-0 items-center justify-center rounded-md bg-[#8E5865] px-2 py-[2px] text-[8px] font-normal @md:text-xs">
                Operational Suggestion
              </span>
            </div>

            <p className="mt-[6px] text-[10px] font-normal @md:text-sm">
              The pressure in well XYZ has gone a lot more beyond safe limits.
            </p>
          </div>
        </div>

        <div className="mt-[10px] w-full @md:flex @md:justify-end">
          <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#24122D] py-[5px] text-[10px] font-normal @md:w-fit @md:px-14">
            Read more
            <MdReviews size={12} color="#ffffff" />
          </button>
        </div>
      </div>
    </GotoerIfLink>
  );
};
