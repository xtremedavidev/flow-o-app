import { ProtectedRouteWrapper, Rightbar, Sidebar, Topbar } from "@/components";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRouteWrapper>
      <main className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="h-screen w-full overflow-hidden">
          <Topbar />

          <div className="flex h-[calc(100vh-100px)] justify-between gap-5 overflow-hidden px-5 py-3">
            <div className="w-full overflow-hidden">{children}</div>

            <Rightbar />
          </div>
        </div>
      </main>
    </ProtectedRouteWrapper>
  );
};
export default DashboardLayout;
