import { getDashboardCardData } from "@/actions";
import {
  ActivesCard,
  EventLogTable,
  FallbackLoader,
  GeneralInsightsCard,
  ListWrapper,
  LocateWellCard,
  ReportDataTable,
  SiteItem,
  SwitcherSitesWells,
  SystemEfficiencyCard,
  WellActivityCard,
} from "@/components";
import { decryptToken, fetcher, getCurrentDate } from "@/utils";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { BsFillDeviceSsdFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "FlowOptix | Dashboard",
  description: "Dashboard for FlowOptix",
};

const DashboardHome = async () => {
  const token = cookies().get("token")?.value;
  const decryptedToken = token ? decryptToken(token) : undefined;

  const { wellsData, devicesData, sitesData } =
    await getDashboardCardData(decryptedToken);

  const { date } = getCurrentDate();

  const SwitcherSitesWellsViewArr = [
    <ListWrapper key="list-wrapper-for-all-sites" listTitle="Sites">
      <Suspense fallback={<FallbackLoader />}>
        {sitesData.data.length < 1 ? (
          <div className="flex w-full justify-center">No site data</div>
        ) : (
          sitesData.data.map((site) => (
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
          ))
        )}
      </Suspense>
    </ListWrapper>,
    <ListWrapper key="list-wrapper-for-all-wells" listTitle="Wells">
      <Suspense fallback={<FallbackLoader />}>
        {wellsData.data.wells.length < 1 ? (
          <div className="flex w-full justify-center">No well data</div>
        ) : (
          wellsData.data.wells.map((well) => (
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
          amount={`${wellsData.data.activeWell}`}
          desc={`of ${wellsData.data.totalWell} total`}
          percentage={
            wellsData.data.totalWell > 0
              ? (wellsData.data.activeWell / wellsData.data.totalWell) * 100
              : 0
          }
        />
        <ActivesCard
          icon={<BsFillDeviceSsdFill />}
          label="Active Devices"
          amount={`${devicesData.data.activeDevice}`}
          desc={`of ${devicesData.data.totalDevice} total`}
          percentage={
            devicesData.data.totalDevice > 0
              ? (devicesData.data.activeDevice / devicesData.data.totalDevice) *
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

      <div className="flex justify-between">
        <div className="w-[45%]">
          <LocateWellCard />
        </div>
        <div className="w-[50%]">
          <WellActivityCard />
        </div>
      </div>

      <GeneralInsightsCard />

      <SwitcherSitesWells currentViewArr={SwitcherSitesWellsViewArr} />

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
