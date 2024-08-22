"use client";

import { FC, PropsWithChildren, useState } from "react";
import { FilterButton } from "./filter-button";
import { StatusSelect } from "../selects";

export const SwitcherSitesWells = () => {
  const [viewSites, setViewSites] = useState(true);

  return (
    <div className="space-y-6">
      <Switcher viewSites={viewSites} setViewSites={setViewSites} />

      {viewSites ? (
        <ListWrapper listTitle="all sites">
          {Array.from({ length: 15 }).map((_, i) => (
            <SiteItem key={i} />
          ))}
        </ListWrapper>
      ) : (
        <ListWrapper listTitle="all wells">
          {Array.from({ length: 15 }).map((_, i) => (
            <SiteItem key={i} />
          ))}
        </ListWrapper>
      )}
    </div>
  );
};

interface SwitcherProps {
  viewSites: boolean;
  setViewSites: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switcher: FC<SwitcherProps> = ({ viewSites, setViewSites }) => {
  const handleViewSites = () => {
    setViewSites(true);
  };

  const handleViewWells = () => {
    setViewSites(false);
  };

  return (
    <div className="flex h-[36px] w-full items-center rounded-[26px] bg-[#297FB8]/[0.1] text-sm font-medium">
      <button
        onClick={handleViewSites}
        className={`flex h-full w-[50%] items-center justify-center rounded-[26px] transition-all duration-200 ease-in-out ${viewSites ? "bg-[#297FB8]" : "bg-transparent"}`}
      >
        View all sites
      </button>
      <button
        onClick={handleViewWells}
        className={`flex h-full w-[50%] items-center justify-center rounded-[26px] transition-all duration-200 ease-in-out ${!viewSites ? "bg-[#297FB8]" : "bg-transparent"}`}
      >
        View all wells
      </button>
    </div>
  );
};

interface ListWrapperProps {
  children: React.ReactNode;
  listTitle: string;
}

const ListWrapper: FC<ListWrapperProps> = ({ listTitle, children }) => {
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

const SiteItem = () => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-solid border-[#555555]/[0.43] bg-[#2D2D2D]/[0.78] px-5 py-4">
      <div>
        <h3 className="text-base font-semibold text-[#E2E2E2]">Site Name/ID</h3>
        <div className="mt-2 space-y-1">
          <p className="text-[10px] font-normal text-[#C9C9C9]">
            <span className="font-semibold">Location:</span> Ottawa, Ontario,
            Canada
          </p>
          <p className="text-[10px] font-normal text-[#C9C9C9]">
            <span className="font-semibold">Coordinate:</span> 45.4215° N,
            75.6972° W
          </p>
        </div>
      </div>

      <div className="text-[10px] font-normal text-white">
        <p>
          <span className="font-semibold">Number of wells:</span> 10
        </p>
        <p className="flex items-center gap-[6px]">
          <StatusIndicator status="no alerts" />
          <span className="font-semibold">Status:</span> No alerts
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span> few Seconds ago
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
