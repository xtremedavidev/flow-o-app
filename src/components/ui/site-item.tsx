import { FC } from "react";
import { StatusSelect } from "../selects";
import { FilterButton } from "../buttons";

interface ListWrapperProps {
  children: React.ReactNode;
  listTitle: string;
}

export const ListWrapper: FC<ListWrapperProps> = ({ listTitle, children }) => {
  return (
    <div className="overflow-hidden rounded-[27px] bg-[#297FB8]/[0.1] px-3 py-4">
      <div className="flex items-center justify-between px-[14px]">
        <h2 className="text-base font-medium">List of {listTitle}</h2>
        <div className="flex items-center gap-[10px]">
          <StatusSelect />
          <FilterButton />
        </div>
      </div>

      <div className="mt-4 h-full max-h-[500px] space-y-[6px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

interface SiteItemProps {
  location: string;
  coordinate: string;
  numberOfWells: number;
  status: string;
  lastUpdated: string;
  name: string;
  id: string;
}

export const SiteItem: FC<SiteItemProps> = ({
  location,
  coordinate,
  numberOfWells,
  status,
  lastUpdated,
  name,
  id,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-solid border-[#555555]/[0.43] bg-[#2D2D2D]/[0.78] px-5 py-4">
      <div>
        <h3 className="text-base font-semibold text-[#E2E2E2]">
          {name} / <span className="text-xs">{id}</span>
        </h3>
        <div className="mt-2 space-y-1">
          <p className="text-[10px] font-normal text-[#C9C9C9]">
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p className="text-[10px] font-normal text-[#C9C9C9]">
            <span className="font-semibold">Coordinate:</span> {coordinate}
          </p>
        </div>
      </div>

      <div className="text-[10px] font-normal text-white">
        <p>
          <span className="font-semibold">Number of wells:</span>{" "}
          {numberOfWells}
        </p>
        <p className="flex items-center gap-[6px]">
          <StatusIndicator status="no alerts" />
          <span className="font-semibold">Status:</span> {status}
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span> {lastUpdated}
        </p>
      </div>
    </div>
  );
};

const StatusIndicator = ({ status }: { status: string }) => {
  return (
    <div
      className="flex h-[8px] w-[8px] shrink-0 rounded-full"
      style={{
        background:
          status === "no alerts"
            ? "#10A957"
            : status === "warning"
              ? "#FF932F"
              : "red",
      }}
    />
  );
};
