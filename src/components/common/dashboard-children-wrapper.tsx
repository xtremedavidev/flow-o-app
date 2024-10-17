"use client";

import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";
import { DashboardPageWrapper } from "./dashboard-page-wrapper";
import { useUserStore } from "@/managers";
import { DataTemplateModal } from "../modals";
import { DataTemplate } from "@/types";

interface DashboardChildrenWrapperProps {
  children: React.ReactNode;
  rightbar: React.ReactNode;
  flowTempData: DataTemplate | { error: string };
}

export const DashboardChildrenWrapper: FC<DashboardChildrenWrapperProps> = ({
  children,
  rightbar,
  flowTempData,
}) => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const shouldHideRightBar = useMemo(
    () => pathsWithoutRightbar.some((path) => pathname.startsWith(path)),
    [pathsWithoutRightbar, pathname]
  );

  if (user && user.onBoardingDone === false) {
    return <DataTemplateModal flowTempData={flowTempData} />;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] justify-between gap-5 overflow-hidden py-3 pl-5">
      <div className="w-full overflow-hidden">
        <DashboardPageWrapper>{children}</DashboardPageWrapper>
      </div>

      {shouldHideRightBar ? null : rightbar}
    </div>
  );
};

const pathsWithoutRightbar = ["/action-center", "/env-compliance", "/settings"];
