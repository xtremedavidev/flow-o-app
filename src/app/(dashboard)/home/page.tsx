import {
  getDashboardCardData,
  getGeneralInsightsChartData,
  getRecords,
} from "@/actions";
import {
  ActivesCard,
  EventLogTable,
  FallbackLoader,
  GeneralInsightsCard,
  ListWrapper,
  // LocateWellCard,
  ReportDataTable,
  SiteItem,
  SwitcherSitesWells,
  SystemEfficiencyCard,
  // WellActivityCard,
  WellChartAndMap,
} from "@/components";
// import { GeneralInsightsAPIResponse } from "@/hooks";
import { decryptToken, encryptToken, getCurrentDate } from "@/utils";

import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { BsFillDeviceSsdFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "FlowOptix | Dashboard",
  description: "Dashboard for FlowOptix",
};

const DashboardHome = async () => {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const { wellsData, devicesData, sitesData } = await getDashboardCardData();
  const recordsData = await getRecords();

  const generalInsightsChartData = await getGeneralInsightsChartData(
    "7206bdaf-79af-4a11-89b6-7fa14de2db7c"
  );

  const { date } = getCurrentDate();

  const SwitcherSitesWellsViewArr = [
    <ListWrapper key="list-wrapper-for-all-sites" listTitle="Sites">
      <Suspense fallback={<FallbackLoader />}>
        {sitesData.data?.data.length < 1 ? (
          <div className="flex w-full justify-center">No site data</div>
        ) : (
          sitesData.data?.data.map((site) => (
            <Link
              key={site.id}
              href={`/home/site/${encodeURIComponent(encryptToken(site.id))}`}
            >
              <SiteItem
                key={site.id}
                id={site.id}
                name={site.name}
                coordinate={site.location}
                lastUpdated={date}
                location={site.location}
                numberOfWells={0}
                status={site.status}
              />
            </Link>
          ))
        )}
      </Suspense>
    </ListWrapper>,
    <ListWrapper key="list-wrapper-for-all-wells" listTitle="Wells">
      <Suspense fallback={<FallbackLoader />}>
        {wellsData.data?.data.wells.length < 1 ? (
          <div className="flex w-full justify-center">No well data</div>
        ) : (
          wellsData.data?.data.wells.map((well) => (
            <Link
              key={well.id}
              href={`/home/well/${encodeURIComponent(encryptToken(well.id))}`}
            >
              <SiteItem
                key={well.id}
                id={well.id}
                name={well.name}
                coordinate={well.location}
                lastUpdated={date}
                location={well.location}
                numberOfWells={0}
                status={well.status}
              />
            </Link>
          ))
        )}
      </Suspense>
    </ListWrapper>,
  ];

  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-6">
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

        <SystemEfficiencyCard
          average_downtime="5 mins"
          average_resolution="2 Hours"
          icon={<BsFillDeviceSsdFill />}
          label="System Efficiency"
          percentage={92}
        />
      </div>

      <WellChartAndMap />

      {generalInsightsChartData && (
        <GeneralInsightsCard
          generalInsightsChartData={generalInsightsChartData.data?.data}
        />
      )}

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
