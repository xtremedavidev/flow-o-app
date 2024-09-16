"use client";

import { LiaOilCanSolid } from "react-icons/lia";
// import { ConditionsItem } from "../ui";
import { RxExternalLink } from "react-icons/rx";
import { BiTask } from "react-icons/bi";
// import { GotoerIfLink } from "../common";
import { FC, useState } from "react";
import { encryptToken, formatDate } from "@/utils";
import Link from "next/link";
import { AlertCardsProps } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TbLoader2 } from "react-icons/tb";

interface PressureAlertCardProps extends AlertCardsProps {}

export const PressureAlertCard: FC<PressureAlertCardProps> = ({
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
        <div className="flex shrink-0 items-center justify-center rounded-full bg-[#A07C5A] p-[10px]">
          <LiaOilCanSolid size={16} color="#002137" />
        </div>
        <div className="@md:w-full">
          <h2 className="text-xs font-bold @md:text-base">{title}</h2>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[8px] font-normal text-white/50 @md:text-xs">
              {formattedtime.formattedDate} {formattedtime.formattedTime}
            </span>
            <span
              className={`flex shrink-0 items-center justify-center rounded-md ${level === "Critical" ? "bg-[#FF4A4A]" : level === "Warning" ? "bg-[#d48a2e]" : "bg-[#3f9360]"} px-2 py-[2px] text-[8px] font-normal @md:text-xs`}
            >
              {level}
            </span>
          </div>

          <p className="mt-[6px] text-[10px] font-normal @md:text-sm">
            {description}
          </p>

          {/* <div className="mt-2 space-y-1 rounded-[10px] bg-white/5 px-[5px] py-1">
              {PressureUpdateArr.map((update, index) => (
                <ConditionsItem
                  key={index}
                  colour={update.color}
                  status={update.desc}
                />
              ))}
            </div> */}
        </div>
      </div>

      <div className="mt-[10px] flex items-center justify-between gap-2 @md:w-full @md:justify-end">
        <Link
          href={`/action-center`}
          className="flex w-full items-center justify-center gap-1 rounded-md bg-[#297FB8] py-[5px] text-[10px] font-normal @md:hidden"
        >
          Expand Alert <RxExternalLink size={12} color="#ffffff" />
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

const PressureUpdateArr = [
  {
    color: "#F94144",
    desc: "Reduce flow rate immediately",
  },
  {
    color: "#D48A2E",
    desc: "Monitor pressure levels for the next 24 hours",
  },
  {
    color: "#D48A2E",
    desc: "Contact site engineer if pressure remains high",
  },
];
