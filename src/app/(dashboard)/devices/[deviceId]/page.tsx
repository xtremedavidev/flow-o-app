import {
  BackArrowButton,
  DeviceActivities,
  FallbackLoader,
  StatusIcon,
} from "@/components";
import { MdAccessTimeFilled } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineStickyNote2 } from "react-icons/md";
import {
  decryptToken,
  encryptToken,
  FetcherResult,
  getCurrentDate,
} from "@/utils";
import { DeviceData, GetNotesResponse } from "@/types";
import { FC, useMemo, Suspense } from "react";
import Link from "next/link";
import { getDevices, getNotes } from "@/server";

interface DeviceByDeviceIDPageProps {
  params: {
    deviceId: string;
  };
}

const DeviceByDeviceIDPage = async ({ params }: DeviceByDeviceIDPageProps) => {
  const deviceId = decryptToken(decodeURIComponent(params.deviceId));

  const deviceData = await getDevices(deviceId);
  const notesData = await getNotes(deviceId);

  return (
    <div>
      <div className="mb-[10px] flex items-center gap-4">
        <BackArrowButton />

        <div className="flex items-end gap-1 text-[26px] font-semibold leading-none">
          <span className="">Manage Devices</span>
          <span className="text-xs">/</span>
          <span className="text-xs">{deviceId}</span>
        </div>
      </div>

      <Suspense fallback={<FallbackLoader />}>
        <DeviceDetailsCard
          deviceData={deviceData.data?.data.devices[0]}
          notesData={notesData}
        />
      </Suspense>

      <DeviceActivities />
    </div>
  );
};

export default DeviceByDeviceIDPage;

interface DeviceDetailsCardProps {
  deviceData: DeviceData;
  notesData: FetcherResult<GetNotesResponse>;
}

const DeviceDetailsCard: FC<DeviceDetailsCardProps> = ({
  deviceData,
  notesData,
}) => {
  // console.log("catching???", deviceData);

  const deviceInfo = useMemo(
    () => [
      { label: "Device ID", value: deviceData.id },
      { label: "Measurement", value: deviceData.measurementType },
      // { label: "Unit", value: "Psi" },
    ],
    [deviceData]
  );

  const deviceMetadata = useMemo(
    () => [
      {
        icon: MdAccessTimeFilled,
        label: "Created At",
        value: deviceData.createdAt,
      },
      {
        icon: TiUser,
        label: "Created by",
        value: deviceData.user_id,
      },
      {
        icon: StatusIcon,
        label: "Status",
        value: deviceData.status,
      },
      {
        icon: MdLocationOn,
        label: "Location",
        value: `${deviceData.site}, ${deviceData.well}`,
      },
    ],
    [deviceData]
  );

  const lastUpdated = getCurrentDate();

  return (
    <div className="mb-6 rounded-[10px] bg-[#292929] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="space-y-[6px]">
          <h3 className="text-2xl font-medium">
            {deviceData.deviceName}/
            <span className="text-[10px] font-normal leading-none">
              {deviceData.id}
            </span>
          </h3>
          {deviceInfo.map((info, index) => (
            <DeviceLabelAndValue
              key={index}
              label={info.label}
              value={info.value}
            />
          ))}
        </div>

        <div className="space-y-[10px]">
          {deviceMetadata.map((data, idx) => (
            <DeviceLabelAndValueWithIcon
              key={idx}
              icon={<data.icon size={16} color="#56555C" />}
              label={data.label}
              value={data.value}
            />
          ))}
        </div>
      </div>

      <div className="mt-[10px] flex w-full items-center justify-between rounded-lg border border-solid border-[#8F8F8F]/[0.31] px-[6px] py-1">
        <Link
          href={`/devices/${encodeURIComponent(encryptToken(deviceData.id))}/notes`}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-[6px]">
            <MdOutlineStickyNote2 size={12} color="#FFFFFF" />
            <span>Notes:</span>
          </div>
          <div className="flex aspect-square h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#1A1C1E]/[0.4] text-[8px] text-white">
            +{notesData.data.notes.length}
          </div>
        </Link>
        <div className="space-y-[2px] text-[10px] text-[#CCCCCC]">
          <p className="font-semibold">Last updated</p>
          <p className="font-normal italic">{lastUpdated.date}</p>
        </div>
      </div>
    </div>
  );
};

const DeviceLabelAndValue = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <p className="text-[10px] font-semibold">
      {label}: <span className="text-xs font-normal italic">{value}</span>
    </p>
  );
};

const DeviceLabelAndValueWithIcon = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-[14px] text-xs">
      <div className="flex items-center gap-[10px]">
        {icon}
        <span className="font-medium text-[#82808F]">{label}</span>
      </div>
      <span className="font-normal text-[#CCCCCC]">{value}</span>
    </div>
  );
};
