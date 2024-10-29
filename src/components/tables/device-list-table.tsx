import { DeviceData } from "@/types";
import { ClientTrWrapper } from "./client-tr-wrapper";
import { FC, useMemo } from "react";
import { encryptToken } from "@/utils";

interface DeviceListTableProps {
  devicesData: DeviceData[];
}

export const DeviceListTable: FC<DeviceListTableProps> = ({ devicesData }) => {
  const transformedDevices = useMemo(
    () =>
      devicesData.map((device) => ({
        name: device.deviceName,
        type: device.measurementType,
        status: device.status,
        location: `${device.site} - ${device.well}`,
        device_id: device.id,
      })),
    [devicesData]
  );

  return (
    // <div className="h-[600px] overflow-x-auto overflow-y-auto">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-[16px] divide-[#202020] overflow-hidden rounded-[10px]">
        <thead className="rounded-[10px] bg-[#292929]">
          <tr>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Device Name/Id
            </th>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Type
            </th>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Status
            </th>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="mt-4 divide-y-8 divide-[#202020]">
          {transformedDevices.map((device, index) => (
            // <tr key={index} className="bg-[#292929]">
            <ClientTrWrapper
              key={index}
              className="cursor-pointer bg-[#292929]"
              pushTo={`/devices/${encodeURIComponent(encryptToken(device.device_id))}`}
            >
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                {device.name}
              </td>
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                {device.type}
              </td>
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                <div className="flex items-center gap-[10px]">
                  <StatusIndicator status={device.status} />
                  <span>{device.status}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                {device.location}
              </td>
            </ClientTrWrapper>
            // </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatusIndicator = ({ status }: { status: string }) => {
  return (
    <div
      className="flex h-3 w-3 shrink-0 rounded-full"
      style={{
        background: status === "ACTIVE" ? "#10A957" : "red",
      }}
    />
  );
};
