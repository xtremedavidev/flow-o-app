import { SemiPieChart } from "../charts";
import { ConditionsItem } from "../ui";
import { PressureAlertCard, SaveEnergyAlertCard } from "../cards";
import { handleResolve } from "@/server";
import { ReportsResponse, SessionDataResponse } from "@/types";
import { FC } from "react";

interface RightbarProps {
  sessionData: SessionDataResponse | { error: string };
  reportsData: ReportsResponse | { error: string };
}

export const Rightbar: FC<RightbarProps> = ({ sessionData, reportsData }) => {
  // Debug logs
  console.log("sessionData:", sessionData);
  console.log("reportsData:", reportsData);

  const filteredReports =
    reportsData && typeof reportsData === "object" && "error" in reportsData
      ? null
      : reportsData?.data?.filter((report) => report.status !== "RESOLVED");

  return (
    <div className="hidden h-full w-full max-w-[30%] shrink-0 flex-col overflow-y-auto rounded-2xl bg-[#333333] px-[14px] py-[19px] @container lg:flex">
      <div className="w-full rounded-2xl bg-[#CBCBCB]/[0.06] px-[18px] py-[14px]">
        <h2 className="mb-6 text-base font-medium">Updates</h2>

        {(!sessionData || "error" in sessionData) && (
          <div className="flex w-full justify-center text-sm font-normal">
            Failed to get report data
          </div>
        )}

        {sessionData && typeof sessionData === "object" && !("error" in sessionData) && (
          <SemiPieChart sessionData={sessionData} />
        )}
        <div className="flex items-center justify-between">
          {ConditionsArr.map((condition, index) => (
            <ConditionsItem
              key={index}
              colour={condition.colour}
              status={condition.status}
            />
          ))}
        </div>
      </div>

      <h2 className="my-4 text-sm font-medium">Recent Alerts</h2>

      <div className="flex flex-col gap-[10px]">
        {"error" in reportsData && (
          <div className="flex w-full justify-center text-sm font-normal">
            Failed to get recent alerts
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[10px]">
        {filteredReports?.length === 0 && (
          <div className="flex w-full justify-center text-sm font-normal">
            No recent alerts
          </div>
        )}

        {filteredReports?.map((report) =>
          report.title.toLowerCase().includes("temperature") ? (
            <PressureAlertCard
              key={report.id}
              id={report.id}
              title={report.title}
              description={report.description}
              time={report.updatedAt}
              level={report.level as "Critical" | "Warning" | "Resolved"}
              handleResolve={handleResolve}
            />
          ) : (
            <SaveEnergyAlertCard
              key={report.id}
              id={report.id}
              title={report.title}
              description={report.description}
              time={report.updatedAt}
              level={report.level as "Critical" | "Warning" | "Resolved"}
              handleResolve={handleResolve}
            />
          )
        )}
      </div>
    </div>
  );
};

export const ConditionsArr = [
  {
    colour: "#F94144",
    status: "Critical",
  },
  {
    colour: "#3F9360",
    status: "Resolved",
  },
];
