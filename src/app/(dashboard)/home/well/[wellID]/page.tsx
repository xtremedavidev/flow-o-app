import {
  getDevices,
  // getGeneralInsightsChartData,
  getRecords,
  getSystemEfficiency,
  getWells,
} from "@/server";
import {
  // ActivesCard,
  BackArrowButton,
  EventLogTable,
  GeneralInsightsCard,
  GeneralInsightsWellsDashboard,
  ReportDataTable,
  // SystemEfficiencyCard,
} from "@/components";
import { decryptToken, getCurrentDate } from "@/utils";
import { FC } from "react";
// import { BsFillDeviceSsdFill } from "react-icons/bs";

interface WellDashboardProps {
  params: { wellID: string };
}

const WellDashboad: FC<WellDashboardProps> = async ({ params }) => {
  const wellID = decryptToken(decodeURIComponent(params.wellID));

  // const siteData = await getSites(siteID);
  const wellsData = await getWells(wellID);
  const devicesData = await getDevices(undefined, wellID);
  const recordsData = await getRecords();
  const sysEffData = await getSystemEfficiency(wellID);

  // const generalInsightsChartData = await getGeneralInsightsChartData(
  //   "7206bdaf-79af-4a11-89b6-7fa14de2db7c"
  // );

  const { date } = getCurrentDate();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <BackArrowButton /> Dashboard{" "}
        <span className="text-xs">/ {wellID}</span>
      </h1>

      {devicesData && wellsData && sysEffData && (
        <GeneralInsightsWellsDashboard
          date={date}
          devicesData={devicesData}
          wellsData={wellsData}
          sysEffData={sysEffData}
        />
      )}

      {/* {generalInsightsChartData && ( */}
      <GeneralInsightsCard
        // generalInsightsChartData={generalInsightsChartData.data?.data}
        wellsData={wellsData}
      />
      {/* )} */}

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

export default WellDashboad;
