import React, { FC } from "react";

interface TimelineProps {
  events: {
    time: string;
    message: string;
    reportId: string;
    date: string;
    value: string;
  }[];
}

export const Timeline: FC<TimelineProps> = ({ events }) => {
  return (
    <div className="flex flex-col p-4 text-white">
      {events.map((event, index) => (
        <div className="relative mb-4 flex" key={index}>
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
          <div className="ml-[10px] flex w-full items-center justify-between rounded-[10px] bg-[#333333] px-[18px] py-[14px]">
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
        </div>
      ))}
    </div>
  );
};
