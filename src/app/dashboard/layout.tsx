import {
  DashboardChildrenWrapper,
  ProtectedRouteWrapper,
  Rightbar,
  Sidebar,
  Topbar,
} from "@/components";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRouteWrapper>
      <main className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="h-screen w-full overflow-hidden">
          <Topbar />

          <DashboardChildrenWrapper rightbar={<Rightbar />}>
            {children}
          </DashboardChildrenWrapper>
        </div>
      </main>
    </ProtectedRouteWrapper>
  );
};
export default DashboardLayout;
