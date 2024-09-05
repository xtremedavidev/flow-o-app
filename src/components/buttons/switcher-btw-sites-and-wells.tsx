"use client";

import { FC, useState } from "react";

interface SwitcherSitesWellsProps {
  currentViewArr: React.ReactNode[];
}

export const SwitcherSitesWells: FC<SwitcherSitesWellsProps> = ({
  currentViewArr,
}) => {
  const [viewSites, setViewSites] = useState(true);

  return (
    <div className="space-y-6">
      <Switcher viewSites={viewSites} setViewSites={setViewSites} />

      {viewSites ? currentViewArr[0] : currentViewArr[1]}
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
