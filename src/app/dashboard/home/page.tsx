import { PageLoader } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowOptix | Dashboard",
  description: "Dashboard for FlowOptix",
};

const DashboardHome = () => {
  return (
    <div className="flex h-full items-start justify-between">
      <div className="h-full w-[65%] overflow-y-auto">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="borderred flex h-full w-full max-w-[30%] shrink-0 flex-col overflow-y-auto rounded-2xl border bg-[#333333]"></div>
    </div>
  );
};
export default DashboardHome;
