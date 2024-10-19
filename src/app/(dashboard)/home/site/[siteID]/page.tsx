import {
  getDevices,
  getRecords,
  getSites,
  getWellActivityChart,
  getWells,
} from "@/server";
import {
  ActivesCard,
  BackArrowButton,
  EventLogTable,
  // FallbackLoader,
  GeneralInsightsCard,
  ListWrapper,
  ReportDataTable,
  // SiteItem,
  // SystemEfficiencyCard,
  WellChartAndMap,
} from "@/components";
import { decryptToken } from "@/utils";
// import Link from "next/link";
import { FC } from "react";
import { BsFillDeviceSsdFill } from "react-icons/bs";

interface SiteDashboardProps {
  params: { siteID: string };
}

const SiteDashboard: FC<SiteDashboardProps> = async ({ params }) => {
  const siteID = decryptToken(decodeURIComponent(params.siteID));

  const siteData = await getSites(siteID);
  const wellsData = await getWells(undefined, siteID);
  const devicesData = await getDevices(undefined, siteID);
  const recordsData = await getRecords();
  const wellChartData = await getWellActivityChart();

  // const generalInsightsChartData = await getGeneralInsightsChartData(
  //   "7206bdaf-79af-4a11-89b6-7fa14de2db7c"
  // );

  // const { date } = getCurrentDate();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <BackArrowButton /> Dashboard{" "}
        <span className="text-xs">/ {siteData.data.data.name}</span>
      </h1>

      <div className="flex w-full items-center justify-between gap-6">
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
        {/* <ActivesCard
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
        /> */}

        {/* <SystemEfficiencyCard
          average_downtime="5 mins"
          average_resolution="2 Hours"
          icon={<BsFillDeviceSsdFill />}
          label="System Efficiency"
          percentage={92}
        /> */}
      </div>

      <WellChartAndMap
        sitesData={siteData.data.data}
        wellChartData={wellChartData}
      />

      {/* {generalInsightsChartData && ( */}
      <GeneralInsightsCard
        // generalInsightsChartData={generalInsightsChartData.data?.data}
        wellsData={wellsData}
      />
      {/* )} */}

      <ListWrapper
        key="list-wrapper-for-all-wells"
        listTitle="Wells"
        baseUrl="/home/well/"
        listData={wellsData.data?.data.wells}
        noOfWells={wellsData.data?.data.totalWell}
      />

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

export default SiteDashboard;
