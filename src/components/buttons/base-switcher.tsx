"use client";

import { cn } from "@/utils";
import React, { FC, useState } from "react";

interface SwitcherProps {
  optionsLabel: string[];
  optionsElements?: React.ReactNode[];
  switcherLabelClassName?: string;
}

export const BaseSwitcher: FC<SwitcherProps> = ({
  optionsLabel,
  optionsElements,
  switcherLabelClassName,
}) => {
  const [currentOption, setCurrentOption] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-5">
      <div
        className={cn(
          `flex h-[36px] w-full items-center rounded-[26px] bg-[#297FB8]/[0.1] text-sm font-medium`,
          switcherLabelClassName,
        )}
      >
        {optionsLabel.map((option, index) => (
          <button
            key={option}
            onClick={() => setCurrentOption(index)}
            style={{ width: `${100 / optionsLabel.length}%` }}
            className={`flex h-full items-center justify-center rounded-[26px] transition-all duration-200 ease-in-out ${currentOption === index ? "bg-[#297FB8]" : "bg-transparent"}`}
          >
            {option}
          </button>
        ))}
      </div>

      {optionsElements && optionsElements[currentOption]}
    </div>
  );
};
