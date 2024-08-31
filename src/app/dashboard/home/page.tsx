import {
  ActivesCard,
  EventLogTable,
  GeneralInsightsCard,
  LocateWellCard,
  ReportDataTable,
  SwitcherSitesWells,
  SystemEfficiencyCard,
  WellActivityCard,
} from "@/components";

import { Metadata } from "next";
import { BsFillDeviceSsdFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "FlowOptix | Dashboard",
  description: "Dashboard for FlowOptix",
};

const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-6">
        {ActiveCardArr.map((card) => (
          <ActivesCard
            key={card.label}
            icon={<card.icon />}
            label={card.label}
            amount={card.amount}
            desc={card.desc}
            percentage={card.percentage}
          />
        ))}

        <SystemEfficiencyCard
          average_downtime="5 mins"
          average_resolution="2 Hours"
          icon={<BsFillDeviceSsdFill />}
          label="System Efficiency"
          percentage={92}
        />
      </div>

      <div className="flex justify-between">
        <div className="w-[45%]">
          <LocateWellCard />
        </div>
        <div className="w-[50%]">
          <WellActivityCard />
        </div>
      </div>

      <GeneralInsightsCard />

      <SwitcherSitesWells />

      <div>
        <div className="w-full overflow-x-auto">
          <ReportDataTable />
        </div>

        <h1 className="mb-5 mt-10 text-center text-xl font-medium">
          Event Log
        </h1>

        <div className="w-full overflow-x-auto">
          <EventLogTable />
        </div>
      </div>
    </div>
  );
};
export default DashboardHome;

const ActiveCardArr = [
  {
    icon: BsFillDeviceSsdFill,
    label: "Active Wells",
    amount: "250",
    desc: "of 300 total",
    percentage: 83,
  },
  {
    icon: BsFillDeviceSsdFill,
    label: "Active Devices",
    amount: "200",
    desc: "of 400 total",
    percentage: 50,
  },
];
