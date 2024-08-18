import React from "react";

export const ManageDevicesCard = () => {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-[#292929] px-[15px] py-[12px]">
      <div>
        <h1 className="text-2xl font-semibold">Manage Devices</h1>
        <p className="flex items-center gap-1 text-xs font-semibold italic text-[#CCCCCC]">
          Last Updated:
          <span className="font-normal text-[#C1C1C1]">31/05/22</span>
          <span>10:32</span>
        </p>
      </div>

      <div className="text-[#CCCCCC]">
        <h2 className="text-base font-semibold">Devices Overview</h2>
        <p className="text-xs font-medium">
          Total Devices: <span className="font-normal">150</span>
        </p>
        <p className="text-xs font-medium">
          Active Devices: <span className="font-normal">140</span>
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
