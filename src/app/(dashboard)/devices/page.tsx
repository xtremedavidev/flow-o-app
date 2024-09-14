import {
  AddDeviceButton,
  DeviceListTable,
  FallbackLoader,
  FilterButton,
  ManageDevicesCard,
} from "@/components";
import { decryptToken, fetcher, getCurrentDate } from "@/utils";
import { TbArrowsSort } from "react-icons/tb";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { DevicesDataResp } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowOptix | Manage Devices",
  description: "Dashboard for FlowOptix",
};

const DashboardDevices = async () => {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const devicesData = await fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

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
        <TbArrowsSort size={24} color="#ABAAAA" />
        <FilterButton />
      </div>

      <div className="mt-[10px]">
        <Suspense fallback={<FallbackLoader />}>
          <DeviceListTable devicesData={devicesData.data?.data.devices} />
        </Suspense>
      </div>
    </div>
  );
};
export default DashboardDevices;
