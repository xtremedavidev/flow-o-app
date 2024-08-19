import { BackArrowButton, DeviceActivities } from "@/components";

interface DeviceByDeviceIDPageProps {
  params: {
    deviceId: string;
  };
}

const DeviceByDeviceIDPage = ({ params }: DeviceByDeviceIDPageProps) => {
  const deviceId = decodeURIComponent(params.deviceId);

  return (
    <div className="h-full overflow-y-auto">
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
      <div>
        <div></div>
        <div></div>
      </div>

      <div></div>
    </div>
  );
};
