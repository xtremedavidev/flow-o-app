import { BackArrowButton, DeviceActivities, StatusIcon } from "@/components";
import { MdAccessTimeFilled } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineStickyNote2 } from "react-icons/md";

interface DeviceByDeviceIDPageProps {
  params: {
    deviceId: string;
  };
}

const DeviceByDeviceIDPage = ({ params }: DeviceByDeviceIDPageProps) => {
  const deviceId = decodeURIComponent(params.deviceId);

  return (
    <div >
      <div className="mb-[10px] flex items-center gap-4">
        <BackArrowButton />

        <div className="flex items-end gap-1 text-[26px] font-semibold leading-none">
          <span className="">Manage Devices</span>
          <span className="text-xs">/</span>
          <span className="text-xs">{deviceId}</span>
        </div>
      </div>

      <DeviceDetailsCard />

      <DeviceActivities />
    </div>
  );
};

export default DeviceByDeviceIDPage;

const DeviceDetailsCard = () => {
  return (
    <div className="mb-6 rounded-[10px] bg-[#292929] p-4">
      <div className="flex justify-between">
        <div className="space-y-[6px]">
          <h3 className="text-2xl font-medium">Device Name/id</h3>
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
        <div>
          <div className="flex items-center gap-[6px]">
            <MdOutlineStickyNote2 size={12} color="#FFFFFF" />
            <span>Note:</span>
          </div>
          <div></div>
        </div>
        <div className="space-y-[2px] text-[10px] text-[#CCCCCC]">
          <p className="font-semibold">Last updated</p>
          <p className="font-normal italic">31/05/22</p>
        </div>
      </div>
    </div>
  );
};

const deviceInfo = [
  { label: "Device ID", value: "0z12x34y" },
  { label: "Measurement", value: "Pressure" },
  { label: "Unit", value: "Psi" },
];

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

const deviceMetadata = [
  {
    icon: MdAccessTimeFilled,
    label: "Created At",
    value: "May, 15 2022 14:23 PM",
  },
  {
    icon: TiUser,
    label: "Created by",
    value: "UsEr Full Name",
  },
  {
    icon: StatusIcon,
    label: "Status",
    value: "Active",
  },
  {
    icon: MdLocationOn,
    label: "Location",
    value: "Site A, Well 001",
  },
];
