import {
  AverageTimeIcon,
  BaseSwitcher,
  ConditionsItem,
  FilterButton,
  PressureAlertCard,
  SaveEnergyAlertCard,
  SemiPieChart,
  SortArrow,
} from "@/components";
import { ConditionsArr } from "@/libs";
import { FC } from "react";
import { GoAlertFill } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { IconType } from "react-icons";
import { MdOutlineTroubleshoot } from "react-icons/md";
import { TbArrowsSort } from "react-icons/tb";
import { getRightbarData, handleResolve } from "@/actions";
import { ReportsResponse, SessionDataResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowOptix | Action Center",
  description: "Action Center for FlowOptix",
};

interface DashboardActionCenterProps {
  searchParams: { [key: string]: string | undefined };
}

const DashboardActionCenter: FC<DashboardActionCenterProps> = async ({
  searchParams,
}) => {
  const sortVal = searchParams.sort || "acc";

  const { sessionData, reportsData } = await getRightbarData();

  const filteredReports =
    sortVal === "acc"
      ? reportsData?.data?.data.filter((report) => report.status !== "RESOLVED")
      : reportsData?.data?.data
          .filter((report) => report.status !== "RESOLVED")
          .reverse();

  const SwitcherOptionsElements = [
    <div key={"All"} className="w-full">
      <div className="flex items-center justify-end">
        <div className="flex w-full items-center justify-end gap-[10px]">
          {/* <MdDateRange size={24} color="#ffffff" /> */}
          {/* <TbArrowsSort size={24} color="#ABAAAA" /> */}
          <SortArrow />
          {/* <FilterButton /> */}
        </div>
      </div>

      <div className="mt-[20px] flex flex-col gap-[14px]">
        {reportsData && filteredReports.length < 1 && (
          <div className="flex w-full justify-center text-sm font-normal">
            No recent alerts or notifications
          </div>
        )}

        {reportsData &&
          filteredReports.map((report) =>
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
    </div>,

    <div key={"Alerts"} className="w-full">
      <div className="flex items-center justify-end">
        <div className="flex w-full items-center justify-end gap-[10px]">
          {/* <MdDateRange size={24} color="#ffffff" /> */}
          <TbArrowsSort size={24} color="#ABAAAA" />
          {/* <FilterButton /> */}
        </div>
      </div>

      <div className="mt-[20px] flex flex-col gap-[14px]">
        {reportsData.data && filteredReports.length < 1 && (
          <div className="flex w-full justify-center text-sm font-normal">
            No recent alerts
          </div>
        )}

        {reportsData &&
          filteredReports
            .filter((report) => report.type === "ALERT")
            .map((report) =>
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
    </div>,

    <div key={"Notifications"} className="w-full">
      <div className="flex items-center justify-end">
        <div className="flex w-full items-center justify-end gap-[10px]">
          {/* <MdDateRange size={24} color="#ffffff" /> */}
          <TbArrowsSort size={24} color="#ABAAAA" />
          {/* <FilterButton /> */}
        </div>
      </div>

      <div className="mt-[20px] flex flex-col gap-[14px]">
        {reportsData.data && filteredReports.length < 1 && (
          <div className="flex w-full justify-center text-sm font-normal">
            No recent notifications
          </div>
        )}

        {reportsData.data &&
          filteredReports
            .filter((report) => report.type === "NOTIFICATION")
            .map((report) =>
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
    </div>,
  ];

  return (
    <div>
      <ActionCenterCard
        sessionData={sessionData.data ? sessionData.data : null}
        reportsData={reportsData.data}
      />
      <div className="my-8">
        <BaseSwitcher
          optionsLabel={SwitcherOptionsArr}
          optionsElements={SwitcherOptionsElements}
          switcherLabelClassName="max-w-[720px] w-full"
        />
      </div>
    </div>
  );
};
export default DashboardActionCenter;

const SwitcherOptionsArr = ["All", "Alerts", "Notifications"];

interface ActionCenterCardProps {
  sessionData: SessionDataResponse | null;
  reportsData: ReportsResponse | null;
}

const ActionCenterCard: FC<ActionCenterCardProps> = ({
  sessionData,
  reportsData,
}) => {
  return (
    <div className="flex flex-col gap-8 rounded-[10px] bg-[#292929] px-[19px] py-[17px] lg:flex-row lg:items-center lg:justify-between lg:gap-0">
      <div className="flex h-full flex-col justify-between gap-[22px]">
        <h1 className="text-xl font-medium">Action Center</h1>

        <div className="flex items-center gap-[18px]">
          <AlertsIndicatorCard sessionData={sessionData} />
          {/* <DiagnosticsCard />
          <NotificationsCard /> */}
        </div>

        <AveragesIndicator
          last_updated="22/06/2024"
          // average_resolution="2 Hours"
        />
      </div>

      <div>
        <div className="w-full rounded-2xl bg-[#CBCBCB]/[0.06] px-[21px] py-[12px]">
          <h2 className="mb-6 text-base font-medium">Alerts</h2>

          {!sessionData?.data && (
            <div className="flex w-full justify-center text-sm font-normal">
              No report data
            </div>
          )}

          {sessionData && <SemiPieChart sessionData={sessionData} />}
          <div className="flex items-center justify-between gap-2">
            {ConditionsArr.map((condition, index) => (
              <ConditionsItem
                key={index}
                colour={condition.colour}
                status={condition.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiagnosticsCard = () => {
  return (
    <ActionCenterCardsWrapper
      title="Diagnostics"
      TitleIcon={MdOutlineTroubleshoot}
      titleIconColor="#65B5EB"
    >
      <div className="mt-[10px]">
        <ConditionsWithDetails
          colour="#3F9360"
          status="Information"
          percentage={15}
          // count={3}
        />
      </div>
    </ActionCenterCardsWrapper>
  );
};

const NotificationsCard = () => {
  return (
    <ActionCenterCardsWrapper
      title="Notifications"
      TitleIcon={IoNotifications}
      titleIconColor="#AFAFAF"
    >
      <div className="mt-[10px] space-y-2">
        {NotificationConditionsArr.map((notif, idx) => (
          <ConditionsWithDetails
            key={idx}
            colour={notif.colour}
            status={notif.status}
            percentage={notif.percentage}
            // count={notif.count}
          />
        ))}
      </div>
    </ActionCenterCardsWrapper>
  );
};

const NotificationConditionsArr = [
  {
    colour: "#D48A2E",
    status: "Unread",
    percentage: 35,
    count: 8,
  },
  {
    colour: "#3F9360",
    status: "Total",
    percentage: 15,
    count: 3,
  },
];

interface AveragesIndicatorProps {
  last_updated: string;
  // average_resolution: string;
}

const AveragesIndicator: FC<AveragesIndicatorProps> = ({
  last_updated,
  // average_resolution,
}) => {
  return (
    <div className="flex shrink-0 items-center gap-[17px]">
      <div className="flex items-center gap-[5px] text-[10px] font-semibold text-[#CCCCCC]">
        <div className="flex items-center gap-[5px]">
          <AverageTimeIcon />
          <span>Last Updated:</span>
        </div>
        <span className="font-normal">{last_updated}</span>
      </div>
      {/* <div className="flex items-center gap-[5px] text-[10px] font-semibold text-[#CCCCCC]">
        <div className="flex items-center gap-[5px]">
          <PiSpeedometerFill color="#828282" size={16} />
          <span>Average Resolution:</span>
        </div>
        <span className="font-normal">{average_resolution}</span>
      </div> */}
    </div>
  );
};

interface ActionCenterCardsWrapperProps {
  children?: React.ReactNode;
  // titleIcon: React.ReactNode;
  TitleIcon: IconType;
  titleIconColor?: string;
  title: string;
}

const ActionCenterCardsWrapper: FC<ActionCenterCardsWrapperProps> = ({
  title,
  TitleIcon,
  titleIconColor,
  children,
}) => {
  return (
    <div className="flex h-full min-h-[110px] flex-col justify-between rounded-xl bg-[#464646] px-3 py-[10px]">
      <div className="flex items-center gap-[6px]">
        <TitleIcon size={18} color={titleIconColor || "#FF932F"} />
        <span className="text-sm font-medium">{title}</span>
      </div>

      {children}
    </div>
  );
};

interface AlertsIndicatorCardProps {
  sessionData: SessionDataResponse | null;
}

const AlertsIndicatorCard: FC<AlertsIndicatorCardProps> = ({ sessionData }) => {
  const ConditionsWithDetailsArr = [
    {
      colour: "#F94144",
      status: "Unresolved",
      percentage: sessionData?.data.unresolvedPercentage,
      // count: 12,
    },
    {
      colour: "#3F9360",
      status: "Resolved",
      percentage: sessionData?.data.resolvedPercentage,
      // count: 3,
    },
  ];

  return (
    <ActionCenterCardsWrapper title="Alerts" TitleIcon={GoAlertFill}>
      <div className="mt-[10px] space-y-2">
        {ConditionsWithDetailsArr.map((condition, idx) => (
          <ConditionsWithDetails
            key={idx}
            colour={condition.colour}
            status={condition.status}
            percentage={Number(condition.percentage)}
            // count={condition.count}
          />
        ))}
      </div>
    </ActionCenterCardsWrapper>
  );
};

interface ConditionsWithDetailsProps {
  colour: string;
  status: string;
  percentage: number;
  // count: number;
}

const ConditionsWithDetails: FC<ConditionsWithDetailsProps> = ({
  colour,
  status,
  percentage,
  // count,
}) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1">
        <div
          style={{ background: colour }}
          className="flex h-[8px] w-[8px] shrink-0 rounded-full"
        />
        <span className="text-[10px] font-semibold">{status}</span>
      </div>

      <div className="flex items-end gap-1 text-[10px] font-normal">
        <span>{percentage}%</span>{" "}
        {/* <span className="text-[8px] italic">({count} alerts)</span> */}
      </div>
    </div>
  );
};

// const ConditionsWithDetailsArr = [
//   {
//     colour: "#F94144",
//     status: "Critical",
//     percentage: 50,
//     count: 12,
//   },
//   {
//     colour: "#D48A2E",
//     status: "Warning",
//     percentage: 35,
//     count: 8,
//   },
//   {
//     colour: "#3F9360",
//     status: "Resolved",
//     percentage: 15,
//     count: 3,
//   },
// ];
