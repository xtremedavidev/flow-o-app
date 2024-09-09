import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { GotoerIfLink } from "../common";
import { FC } from "react";
import { AlertCardsProps } from "@/types";
import { formatDate } from "@/utils";
import Link from "next/link";

interface PressureAlertCardProps extends AlertCardsProps {}

export const SaveEnergyAlertCard: FC<PressureAlertCardProps> = ({
  id,
  description,
  handleResolve,
  level,
  time,
  title,
}) => {
  const formattedtime = formatDate(time);

  return (
    <GotoerIfLink url={`/action-center/${id}`}>
      <div className="cursor-pointer rounded-[10px] border-2 border-solid border-white/[0.09] bg-gradient-to-tr from-[#FF00B8]/[0.09] to-[#FF00C7]/[0.09] px-[10px] py-2 @container">
        <div className="flex items-center justify-between gap-4">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-[10px]">
            <FaHeart size={16} color="#24122D" />
          </div>
          <div className="@md:w-full">
            <h2 className="text-xs font-bold @md:text-base">{title}</h2>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[8px] font-normal text-white/50 @md:text-xs">
                {formattedtime.formattedDate} {formattedtime.formattedTime}
              </span>
              <span className="flex shrink-0 items-center justify-center rounded-md bg-[#8E5865] px-2 py-[2px] text-[8px] font-normal @md:text-xs">
                {level}
              </span>
            </div>

            <p className="mt-[6px] text-[10px] font-normal @md:text-sm">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-[10px] w-full @md:flex @md:justify-end">
          <Link
            href={`/action-center/${id}`}
            className="flex w-full items-center justify-center gap-1 rounded-md bg-[#24122D] py-[5px] text-[10px] font-normal @md:w-fit @md:px-14"
          >
            Read more
            <MdReviews size={12} color="#ffffff" />
          </Link>
        </div>
      </div>
    </GotoerIfLink>
  );
};
