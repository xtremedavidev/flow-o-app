"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

interface DashboardChildrenWrapperProps {
  children: React.ReactNode;
  rightbar?: React.ReactNode;
}

export const DashboardChildrenWrapper: FC<DashboardChildrenWrapperProps> = ({
  children,
  rightbar,
}) => {
  const pathname = usePathname();
  return (
    <div className="flex h-[calc(100vh-100px)] justify-between gap-5 overflow-hidden px-5 py-3">
      <div className="w-full overflow-hidden">{children}</div>

      {!pathname.startsWith("/dashboard/action-center") && rightbar}
    </div>
  );
};
