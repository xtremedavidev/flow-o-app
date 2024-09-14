import { SemiPieChart } from "../charts";
// import { ConditionsArr } from "@/libs";
import { ConditionsItem } from "../ui";
import { PressureAlertCard, SaveEnergyAlertCard } from "../cards";
import { getRightbarData, handleResolve } from "@/actions";
// import { cookies } from "next/headers";
import { decryptToken, fetcher } from "@/utils";
// import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const Rightbar = async () => {
  const token = Cookies.get("token");
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const { sessionData, reportsData } = await getRightbarData();

  return (
    <div className="flex h-full w-full max-w-[30%] shrink-0 flex-col overflow-y-auto rounded-2xl bg-[#333333] px-[14px] py-[19px] @container">
      <div className="w-full rounded-2xl bg-[#CBCBCB]/[0.06] px-[18px] py-[14px]">
        <h2 className="mb-6 text-base font-medium">Updates</h2>

        {!sessionData?.data && (
          <div className="flex w-full justify-center text-sm font-normal">
            No report data
          </div>
        )}

        {sessionData && <SemiPieChart sessionData={sessionData.data} />}
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
        {reportsData && reportsData?.data?.data.length < 1 && (
          <div className="flex w-full justify-center text-sm font-normal">
            No recent alerts
          </div>
        )}

        {reportsData &&
          reportsData?.data?.data.map((report) =>
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
  // {
  //   colour: "#D48A2E",
  //   status: "Warning",
  // },
  {
    colour: "#3F9360",
    status: "Resolved",
  },
];
