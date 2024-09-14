"use client";

import { getCurrentDate } from "@/utils";
import React, { FC, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";

interface TimelineProps {
  events: {
    time: string;
    message: string;
    reportId: string;
    date: string;
    value: string;
    // lastUpdated: {
    //   date: string;
    //   time: string;
    // };
  }[];
}

export const Timeline: FC<TimelineProps> = ({ events }) => {
  const lastUpdated = getCurrentDate();

  return (
    <div className="flex cursor-pointer flex-col p-4 text-white">
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} lastUpdated={lastUpdated} />
      ))}
    </div>
  );
};

interface TimelineItemProps {
  event: {
    time: string;
    message: string;
    reportId: string;
    date: string;
    value: string;
  };
  lastUpdated: {
    date: string;
    time: string;
  };
}

const TimelineItem: FC<TimelineItemProps> = ({ event, lastUpdated }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mb-4 flex">
      <div className="flex min-h-full gap-2">
        <div className="pr-4 pt-1 text-[8px] font-bold italic text-[#64C1FF]">
          {event.time}
        </div>
        <div className="flex h-full shrink-0 flex-col gap-1">
          <div className="rounded-full border border-solid border-[#297FB8] bg-[#3D6680] p-[3px]">
            <div className="flex h-3 w-3 shrink-0 rounded-full bg-[#142A39]" />
          </div>
          <div className="mx-auto flex min-h-[calc(100%-12px)] w-[2px] grow rounded-full bg-[#A4A4A4]" />
        </div>
      </div>
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="ml-[10px] w-full rounded-[10px] bg-[#333333] px-[18px] py-[14px]"
      >
        <div className="flex w-full items-center justify-between">
          <div>
            <h4 className="text-xs font-medium">{event.message}</h4>
            <div className="mt-1 flex items-center gap-[10px] text-[8px] text-[#CCCCCC]">
              <span className="flex gap-[2px]">
                <span className="font-semibold">Report ID:</span>
                <span className="italic">{event.reportId}</span>
              </span>
              <span className="flex gap-1">
                <span className="italic">{event.time}</span>
                <span className="font-semibold">{event.date}</span>
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="flex justify-end text-[8px] font-semibold text-[#CCCCCC]">
              Value:
            </p>
            <div className="text-[20px] font-semibold leading-none text-white">
              {event.value} psi
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-[14px] flex w-full items-center justify-between rounded-lg border border-solid border-[#8F8F8F]/[0.31] px-[6px] py-1">
            <div>
              <div className="flex items-center gap-[6px]">
                <MdOutlineStickyNote2 size={12} color="#FFFFFF" />
                <span className="text-xs">Remarks:</span>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col items-end space-y-[2px] text-[10px] text-[#CCCCCC]">
              <p className="font-semibold">Last updated</p>
              <p className="font-normal italic">{lastUpdated.date}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
