"use client";

import { cn } from "@/utils";
import Link from "next/link";
import React, { FC, useState } from "react";
import { TbArrowsSort, TbFilterFilled } from "react-icons/tb";

interface FilterButtonProps {
  className?: string;
  handleClick?: () => void;
}

export const FilterButton: FC<FilterButtonProps> = ({
  className,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={cn(
        `flex items-center gap-[10px] rounded-lg bg-[#464646] px-[10px] py-[6px] text-[10px] font-semibold`,
        className
      )}
    >
      <TbFilterFilled size={12} />
      <span>Filter</span>
    </button>
  );
};

export const SortArrow = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentSortOrder = urlParams.get("sort") || "acc";
  const [sortOrder, setSortOrder] = useState<"acc" | "desc">(
    currentSortOrder as "acc" | "desc"
  );

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "acc" ? "desc" : "acc";
    setSortOrder(newSortOrder);
  };

  return (
    <Link href={`?sort=${sortOrder}`} onClick={toggleSortOrder}>
      <TbArrowsSort
        size={24}
        color="#ABAAAA"
        onClick={toggleSortOrder}
        className="cursor-pointer"
      />
    </Link>
  );
};
