import { cn } from "@/utils";
import React from "react";
import { TbFilterFilled } from "react-icons/tb";

export const FilterButton = ({ className }: { className?: string }) => {
  return (
    <button
      className={cn(
        `flex items-center gap-[10px] rounded-lg bg-[#464646] px-[10px] py-[6px] text-[10px] font-semibold`,
        className,
      )}
    >
      <TbFilterFilled size={12} />
      <span>Filter</span>
    </button>
  );
};
