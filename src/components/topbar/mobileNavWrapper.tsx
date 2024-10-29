"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

interface MobileDrawerWrapperProps {
  open: boolean;
}

export const MobileDrawerWrapper: FC<
  MobileDrawerWrapperProps & PropsWithChildren
> = ({ open, children }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open) {
      setHeight(window.innerHeight - 100);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div
      style={{
        height: height,
        transition: "height 0.3s ease-in-out",
      }}
      className="fixed left-0 top-[100px] z-[100] flex max-h-[calc(100svh-100px)] w-full justify-center overflow-hidden overflow-y-auto bg-[#202020] uppercase lg:hidden"
    >
      {children}
    </div>
  );
};
