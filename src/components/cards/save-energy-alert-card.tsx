"use client";

import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
// import { GotoerIfLink } from "../common";
import { FC, useState } from "react";
import { AlertCardsProps } from "@/types";
import { encryptToken, formatDate } from "@/utils";
import Link from "next/link";
import { BiTask } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TbLoader2 } from "react-icons/tb";

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
  const encryptID = encodeURIComponent(encryptToken(id));
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    // <GotoerIfLink url={`/action-center/${encryptID}`}>
    <div
      className={`cursor-pointer rounded-[10px] border-2 border-solid ${level === "Critical" ? "border-[#FF0000]/[0.19]" : level === "Warning" ? "border-[#d48a2e]/[0.11]" : "border-[#3f9360]/[0.11]"} ${level === "Critical" ? "bg-[#FF0000]/[0.11]" : level === "Warning" ? "bg-[#d48a2e]/[0.11]" : "bg-[#3f9360]/[0.11]"} px-[10px] py-2 @container`}
    >
      <div
        onClick={() => router.push(`/action-center/${encryptID}`)}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-[10px]">
          <FaHeart size={16} color="#24122D" />
        </div>
        <div className="@md:w-full">
          <h2 className="text-xs font-bold @md:text-base">{title}</h2>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[8px] font-normal text-white/50 @md:text-xs">
              {formattedtime.formattedDate} {formattedtime.formattedTime}
            </span>
            <span
              className={`flex shrink-0 items-center justify-center rounded-md ${level === "Critical" ? "bg-[#FF4A4A]" : level === "Warning" ? "bg-[#d48a2e]" : "bg-[#3f9360]"} lbg-[#8E5865] px-2 py-[2px] text-[8px] font-normal @md:text-xs`}
            >
              {level}
            </span>
          </div>

          <p className="mt-[6px] text-[10px] font-normal @md:text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-[10px] flex w-full items-center justify-between gap-2 @md:flex @md:justify-end">
        <Link
          href={`/action-center`}
          className="flex w-full items-center justify-center gap-1 rounded-md bg-[#24122D] py-[5px] text-[10px] font-normal @md:hidden @md:w-fit @md:px-14"
        >
          Read more
          <MdReviews size={12} color="#ffffff" />
        </Link>
        <button
          onClick={async () => {
            setIsLoading(true);
            const res = await handleResolve(encryptID).finally(() =>
              setIsLoading(false)
            );
            toast.info(res.data.message || res.error);
          }}
          className="flex shrink-0 items-center justify-center gap-1 rounded-md bg-[#1F7541] px-2 py-[5px] text-[10px] font-normal"
        >
          {isLoading ? (
            <TbLoader2 size={12} color="#ffffff" className="animate-spin" />
          ) : (
            <>
              <BiTask size={12} color="#ffffff" /> Mark Resolved
            </>
          )}
        </button>
      </div>
    </div>
    // </GotoerIfLink>
  );
};
