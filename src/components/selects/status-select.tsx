"use client";

import { FC } from "react";

export type CurrentStatusValues = "all" | "active" | "inactive";

interface StatusSelectProps {
  onChange: (text: CurrentStatusValues) => void;
}

export const StatusSelect: FC<StatusSelectProps> = ({ onChange }) => {
  // const [currentStatus, setCurrentStatus] =
  //   useState<CurrentStatusValues>("all");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setCurrentStatus(e.target.value as CurrentStatusValues);
    onChange(e.target.value as CurrentStatusValues);
  };

  return (
    <select
      name="status"
      id="status"
      className="h-full w-full border-none bg-transparent text-xs font-normal text-white outline-none ring-transparent"
      onChange={handleChange}
    >
      <option value="" disabled selected>
        Status
      </option>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};
