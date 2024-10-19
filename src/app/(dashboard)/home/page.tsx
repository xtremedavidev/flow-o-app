import {
  getDashboardCardData,
  getRecords,
  getTotalSystemEff,
  getWellActivityChart,
} from "@/server";

import {
  ActivesCard,
  EventLogTable,
  GeneralInsightsCard,
  ListWrapper,
  ReportDataTable,
  SwitcherSitesWells,
  SystemEfficiencyCard,
  WellChartAndMap,
} from "@/components";
import { Metadata } from "next";
import { BsFillDeviceSsdFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "FlowOptix | Dashboard",
  description: "Dashboard for FlowOptix",
};

const DashboardHome = async () => {
  const { wellsData, devicesData, sitesData } = await getDashboardCardData();
  const recordsData = await getRecords();
  const wellChartData = await getWellActivityChart();
  const totalSysEffData = await getTotalSystemEff();

  const SwitcherSitesWellsViewArr = [
    <ListWrapper
      key="list-wrapper-for-all-sites"
      listTitle="Sites"
      baseUrl="/home/site/"
      listData={sitesData.data?.data}
    />,
    <ListWrapper
      key="list-wrapper-for-all-wells"
      listTitle="Wells"
      baseUrl="/home/well/"
      listData={wellsData.data?.data.wells}
      // noOfWells={wellsData.data?.data.totalWell}
    />,
  ];

  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
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

        {"error" in totalSysEffData ? null : (
          <SystemEfficiencyCard
            className="lg:hidden xl:block"
            average_downtime={`${Number(totalSysEffData.data.averageDowntime.toFixed(2))}`}
            average_resolution={`${Number(totalSysEffData.data.averageResolutionTime.toFixed(2))}`}
            icon={<BsFillDeviceSsdFill />}
            label="System Efficiency"
            percentage={Number(totalSysEffData.data.ResolutionRate.toFixed(2))}
          />
        )}
      </div>

      {"error" in totalSysEffData ? null : (
        <SystemEfficiencyCard
          className="my-4 hidden w-full lg:block xl:hidden"
          average_downtime={`${Number(totalSysEffData.data.averageDowntime.toFixed(2))}`}
          average_resolution={`${Number(totalSysEffData.data.averageResolutionTime.toFixed(2))}`}
          icon={<BsFillDeviceSsdFill />}
          label="System Efficiency"
          percentage={Number(totalSysEffData.data.ResolutionRate.toFixed(2))}
        />
      )}

      <WellChartAndMap
        sitesData={sitesData.data.data}
        wellChartData={wellChartData}
      />

      <GeneralInsightsCard wellsData={wellsData} />

      <SwitcherSitesWells currentViewArr={SwitcherSitesWellsViewArr} />

      <div className="mt-10 rounded-[27px] bg-[#297FB8]/[0.1] p-3">
        <h1 className="mb-5 text-center text-xl font-medium">Report Data</h1>
        <div className="w-full overflow-x-auto">
          <ReportDataTable recordsData={recordsData?.data} />
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
