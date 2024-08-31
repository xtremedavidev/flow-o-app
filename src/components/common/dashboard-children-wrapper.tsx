"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import { DashboardPageWrapper } from "./dashboard-page-wrapper";

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
    <div className="flex h-[calc(100vh-100px)] justify-between gap-5 overflow-hidden py-3 pl-5">
      <div className="w-full overflow-hidden">
        <DashboardPageWrapper>{children}</DashboardPageWrapper>
      </div>

      {!pathname.startsWith("/dashboard/action-center") && rightbar}
    </div>
  );
};
