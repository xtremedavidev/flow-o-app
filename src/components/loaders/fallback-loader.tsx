import React from "react";
import { TbLoader2 } from "react-icons/tb";

export const FallbackLoader = () => {
  return (
    <div className="flex w-full animate-pulse items-center justify-center">
      <TbLoader2 className="animate-spin" size={28} color="#ffffff" />
    </div>
  );
};
