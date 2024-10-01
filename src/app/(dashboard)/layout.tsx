import { getDataTemplate } from "@/actions";
import {
  DashboardChildrenWrapper,
  ProtectedRouteWrapper,
  Rightbar,
  Sidebar,
  Topbar,
} from "@/components";
import { FC, PropsWithChildren } from "react";

interface DashboardLayoutProps extends PropsWithChildren {}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const flowTempData = await getDataTemplate();

  return (
    <ProtectedRouteWrapper>
      <main className="flex h-[100dvh] w-full overflow-hidden">
        <Sidebar className="hidden lg:flex" />
        <div className="h-[100dvh] w-full overflow-hidden">
          <Topbar />

          <DashboardChildrenWrapper
            flowTempData={flowTempData}
            rightbar={<Rightbar />}
          >
            {children}
          </DashboardChildrenWrapper>
        </div>
      </main>
    </ProtectedRouteWrapper>
  );
};
export default DashboardLayout;
