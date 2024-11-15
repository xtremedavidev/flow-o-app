"use client";

import { BsFillDeviceSsdFill } from "react-icons/bs";
import { ActivesCard, SystemEfficiencyCard } from "../cards";
import { FC, useEffect, useState } from "react";
import { FetcherResult } from "@/utils";
import { DevicesDataResp, SystemEfficiency, WellsResponse } from "@/types";
import { FaAngleDown } from "react-icons/fa6";
import { toast } from "react-toastify";

interface GeneralInsightsWellsDashboardProps {
  wellsData: FetcherResult<WellsResponse>;
  devicesData: FetcherResult<DevicesDataResp>;
  date: string;
  sysEffData: SystemEfficiency | { error: string };
}

export const GeneralInsightsWellsDashboard: FC<
  GeneralInsightsWellsDashboardProps
> = ({ wellsData, devicesData, date, sysEffData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ("error" in sysEffData) {
      toast.error(sysEffData.error);
    }
  }, [sysEffData]);

  if ("error" in wellsData || "error" in devicesData) {
    return <div>{wellsData.error || devicesData.error}</div>;
  }

  return (
    <div className="rounded-[10px] bg-[#292929] p-3 transition-all duration-300 ease-linear">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">General Insight</h1>

        <div className="flex w-full justify-between">
          <div>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] font-normal text-[#C9C9C9]">
                <span className="font-semibold">Location:</span>{" "}
                {wellsData.data.data.wells[0].location}
              </p>
            </div>
          </div>

          <div className="text-[10px] font-normal text-white">
            <div className="flex items-center gap-[6px]">
              <StatusIndicator status="no alerts" />
              <span className="font-semibold">Status:</span>{" "}
              {wellsData.data.data.wells[0].status}
            </div>
            <p>
              <span className="font-semibold">Last Updated:</span> {date}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${isVisible ? "flex" : "hidden"} flex-col items-center gap-6 transition-all duration-300 ease-linear lg:flex-row`}
      >
        <ActivesCard
          icon={<BsFillDeviceSsdFill />}
          label="Active Wells"
          amount={`${wellsData.data?.data.activeWell}`}
          desc={`of ${wellsData.data?.data.totalWell} total`}
          percentage={
            wellsData.data?.data.totalWell > 0
              ? (wellsData.data?.data.activeWell /
                  wellsData.data?.data.totalWell) *
                100
              : 0
          }
        />
        <ActivesCard
          icon={<BsFillDeviceSsdFill />}
          label="Active Devices"
          amount={`${devicesData.data?.data.activeDevice}`}
          desc={`of ${devicesData.data?.data.totalDevice} total`}
          percentage={
            devicesData.data?.data.totalDevice > 0
              ? (devicesData.data?.data.activeDevice /
                  devicesData.data?.data.totalDevice) *
                100
              : 0
          }
        />
        {"error" in sysEffData ? null : (
          <SystemEfficiencyCard
            className="lg:hidden xl:block"
            average_downtime={`${Number(sysEffData.averageDowntime.toFixed(2))}`}
            average_resolution={`${Number(sysEffData.averageResolutionTime.toFixed(2))}`}
            icon={<BsFillDeviceSsdFill />}
            label="System Efficiency"
            percentage={Number(sysEffData.ResolutionRate.toFixed(2))}
          />
        )}
      </div>

      {"error" in sysEffData ? null : (
        <SystemEfficiencyCard
          className="my-4 hidden w-full lg:block xl:hidden"
          average_downtime={`${Number(sysEffData.averageDowntime.toFixed(2))}`}
          average_resolution={`${Number(sysEffData.averageResolutionTime.toFixed(2))}`}
          icon={<BsFillDeviceSsdFill />}
          label="System Efficiency"
          percentage={Number(sysEffData.ResolutionRate.toFixed(2))}
        />
      )}

      <div className="mt-[10px] flex w-full justify-center">
        <button
          onClick={() => setIsVisible((prev) => !prev)}
          className="flex items-center gap-[6px] rounded-[26px] bg-[#505050] px-[10px] py-1 text-[10px] font-normal text-white"
        >
          {isVisible ? "See Less" : "See More"}{" "}
          <FaAngleDown
            size={12}
            color="#828282"
            className={`${isVisible ? "rotate-180" : ""} transition-all duration-300 ease-linear`}
          />
        </button>
      </div>
    </div>
  );
};

const StatusIndicator = ({ status }: { status: string }) => {
  return (
    <div
      className="flex h-[8px] w-[8px] shrink-0 rounded-full"
      style={{
        background:
          status === "no alerts"
            ? "#10A957"
            : status === "warning"
              ? "#FF932F"
              : "red",
      }}
    />
  );
};
