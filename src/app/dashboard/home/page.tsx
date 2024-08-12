import {
  CircularProgressBar,
  ColumnChart,
  LineChart,
  PuslingMapChart,
} from "@/components";
import { Metadata } from "next";
import { FC } from "react";
import { BsFillDeviceSsdFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "FlowOptix | Dashboard",
  description: "Dashboard for FlowOptix",
};

const DashboardHome = () => {
  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto">
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
    </div>
  );
};
export default DashboardHome;

const WellActivityCard = () => {
  return (
    <div className="w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-[#E2E2E2]">
            Well Activity
          </h1>

          <p className="text-xs font-normal text-[#BCBCBC]">
            Active Wells x days
          </p>
        </div>

        <div className="text-[10px] font-normal text-[#BDBDBD]">
          Change range
        </div>
      </div>

      <ColumnChart />
    </div>
  );
};

const LocateWellCard = () => {
  return (
    <div className="w-full rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h1 className="text-base font-medium text-[#E2E2E2]">Locate Well</h1>

      <p className="text-xs font-normal text-[#BCBCBC]">
        (Click on map to expand)
      </p>

      <div className="relative mt-3">
        <PuslingMapChart />
      </div>
    </div>
  );
};

const GeneralInsightsCard = () => {
  return (
    <div className="rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h2 className="text-xl font-medium">General Insight</h2>

      <div className="mt-[10px] text-xs font-normal text-[#BDBDBD]">
        Select Category
      </div>

      <hr className="my-[30px] w-full border-[1.5px] border-solid border-[#565656]/[0.35]" />

      <LineChart />
    </div>
  );
};

interface ActivesCardProps {
  icon: React.ReactNode;
  label: string;
  amount: string;
  desc: string;
  percentage: number;
}

const ActivesCard: FC<ActivesCardProps> = ({
  icon,
  label,
  amount,
  desc,
  percentage,
}) => {
  return (
    <div className="w-full max-w-[237px] rounded-2xl bg-[#1E3647] px-[14px] py-[6px] text-white">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white/[0.19] p-[5.65px]">{icon}</div>
        <h2 className="text-sm font-normal">{label}</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <p className="text-[32px] font-normal leading-none">{amount}</p>
          <p className="text-[10px] font-light">{desc}</p>
        </div>

        <div>
          <CircularProgressBar percentage={percentage} />
        </div>
      </div>
    </div>
  );
};

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
