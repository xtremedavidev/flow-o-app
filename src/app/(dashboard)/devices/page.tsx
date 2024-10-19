import {
  AddDeviceButton,
  DeviceListTable,
  FallbackLoader,
  ManageDevicesCard,
  SortArrow,
} from "@/components";
import { decryptToken, fetcher, getCurrentDate } from "@/utils";
import { cookies } from "next/headers";
import { FC, Suspense } from "react";
import { DevicesDataResp } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const metadata: Metadata = {
  title: "FlowOptix | Manage Devices",
  description: "Dashboard for FlowOptix",
};

interface DashboardDevicesParams {
  searchParams: { [key: string]: string | undefined };
}

const DashboardDevices: FC<DashboardDevicesParams> = async ({
  searchParams,
}) => {
  const sortVal = searchParams.sort || "acc";

  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!token) {
    redirect("/login");
  }

  const devicesData = await fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const sortedDevicesData =
    sortVal === "acc"
      ? devicesData.data?.data.devices
      : devicesData.data?.data.devices.reverse();

  const lastUpdated = getCurrentDate();

  // console.log("device data -------", devicesData.data.devices);

  return (
    <div>
      <Suspense fallback={<FallbackLoader />}>
        <ManageDevicesCard
          active_devices={devicesData.data?.data.activeDevice}
          total_devices={devicesData.data?.data.totalDevice}
          last_updated={lastUpdated}
        />
      </Suspense>

      <div className="mb-5 mt-[26px] flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Devices List</h1>

        <AddDeviceButton />
      </div>

      <div className="flex w-full items-center justify-end gap-[10px]">
        <SortArrow />
        {/* <FilterButton /> */}
      </div>

      <div className="mt-[10px]">
        <Suspense fallback={<FallbackLoader />}>
          <DeviceListTable devicesData={sortedDevicesData} />
        </Suspense>
      </div>
    </div>
  );
};
export default DashboardDevices;
