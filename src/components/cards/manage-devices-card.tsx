import { FC } from "react";

interface ManageDevicesCardProps {
  total_devices: number;
  active_devices: number;
  last_updated: {
    date: string;
    time: string;
  };
}

export const ManageDevicesCard: FC<ManageDevicesCardProps> = ({
  total_devices,
  active_devices,
  last_updated,
}) => {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-[#292929] px-[15px] py-[12px]">
      <div>
        <h1 className="text-2xl font-semibold">Manage Devices</h1>
        <p className="flex items-center gap-1 text-xs font-semibold italic text-[#CCCCCC]">
          Last Updated:
          <span className="font-normal text-[#C1C1C1]">
            {last_updated.date}
          </span>
          <span>{last_updated.time}</span>
        </p>
      </div>

      <div className="text-[#CCCCCC]">
        <h2 className="text-base font-semibold">Devices Overview</h2>
        <p className="text-xs font-medium">
          Total Devices: <span className="font-normal">{total_devices}</span>
        </p>
        <p className="text-xs font-medium">
          Active Devices: <span className="font-normal">{active_devices}</span>
        </p>

        <div className="flex items-center gap-2">
          <StreamDetails type="up" value="2Tb" />
          <StreamDetails type="down" value="1Tb" />
        </div>
      </div>
    </div>
  );
};

const StreamDetails = ({
  type,
  value,
}: {
  type: "up" | "down";
  value: string;
}) => {
  return (
    <span
      style={{ color: type === "up" ? "#31F58C" : "#D48A2E" }}
      className="text-[10px] font-medium"
    >
      {type === "up" ? "Upstream" : "Downstream"}/
      <span className="text-[8px] text-[#CCCCCC]">{value}</span>
    </span>
  );
};
