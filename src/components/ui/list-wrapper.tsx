"use client";

import { FC, Suspense, useMemo, useState } from "react";
import { FilterButton } from "../buttons";
import { CurrentStatusValues, StatusSelect } from "../selects";
import Link from "next/link";
import { SiteItem } from "./site-item";
import { encryptToken, formatDate } from "@/utils";
import { FallbackLoader } from "../loaders";

interface ListWrapperProps {
  // children: React.ReactNode;
  listTitle: string;
  listData: any[];
  baseUrl: string;
  noOfWells?: number;
}

export const ListWrapper: FC<ListWrapperProps> = ({
  listTitle,
  listData,
  baseUrl,
  noOfWells,
}) => {
  const [filterStatus, setFilterStatus] = useState<CurrentStatusValues>("all");

  const [pendingStatus, setPendingStatus] =
    useState<CurrentStatusValues>("all");

  const [effectFilter, setEffectFilter] = useState(false);

  const handleFilterChange = (status: CurrentStatusValues) => {
    setPendingStatus(status);
  };

  const applyFilter = () => {
    setFilterStatus(pendingStatus);
    setEffectFilter((prev) => !prev);
  };

  const listFinalData = useMemo(
    () =>
      filterStatus === "all"
        ? listData
        : filterStatus === "active"
          ? listData.filter((item) => item.status === "ACTIVE")
          : listData.filter((item) => item.status === "INACTIVE"),
    [effectFilter, listData]
  );

  return (
    <div className="overflow-hidden rounded-[27px] bg-[#297FB8]/[0.1] px-3 py-4">
      <div className="flex items-center justify-between px-[14px]">
        <h2 className="text-base font-medium">List of {listTitle}</h2>
        <div className="flex items-center gap-[10px]">
          <StatusSelect onChange={handleFilterChange} />
          <FilterButton handleClick={applyFilter} />
        </div>
      </div>

      <div className="mt-4 h-full max-h-[500px] space-y-[6px] overflow-y-auto">
        {/* {children} */}

        <Suspense fallback={<FallbackLoader />}>
          {listFinalData.length < 1 ? (
            <div className="flex w-full justify-center">No site data</div>
          ) : (
            listFinalData.map((listItem) => {
              const formatteddate = formatDate(listItem.updatedAt);
              return (
                <Link
                  key={listItem.id}
                  href={`${baseUrl}${encodeURIComponent(encryptToken(listItem.id))}`}
                >
                  <SiteItem
                    key={listItem.id}
                    id={listItem.id}
                    name={listItem.name}
                    coordinate={listItem.location}
                    lastUpdated={`${formatteddate.formattedDate} ${formatteddate.formattedTime}`}
                    location={listItem.location}
                    numberOfWells={noOfWells}
                    status={listItem.status}
                  />
                </Link>
              );
            })
          )}
        </Suspense>
      </div>
    </div>
  );
};
