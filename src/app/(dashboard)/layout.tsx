import {
  DashboardChildrenWrapper,
  ProtectedRouteWrapper,
  Rightbar,
  Sidebar,
  Topbar,
} from "@/components";
import { cookies } from "next/headers";
import { FC, PropsWithChildren } from "react";
import { getDataTemplate, getSessionDataSF } from "../../server";
import { ReportsResponse } from "@/types";

interface DashboardLayoutProps extends PropsWithChildren {}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const token = cookies().get("token")?.value;
  // const decryptedToken = decryptToken(decodeURIComponent(token!));

  const flowTempData = await getDataTemplate();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROUTE_BASE_URL}/api/reports`,
    {
      headers: {
        // Authorization: `Bearer ${decryptedToken}`,
        cookie: `token=${token}`,
      },
      credentials: "include",
    }
  );
  const reportsData: ReportsResponse = await res.json();
  // const reportsData = await getReportsDataSF();
  const sessionData = await getSessionDataSF();

  return (
    <ProtectedRouteWrapper token={token}>
      <main className="flex h-screen w-full overflow-hidden">
        <Sidebar className="hidden lg:flex" />
        <div className="h-screen w-full overflow-hidden">
          <Topbar />

          <DashboardChildrenWrapper
            flowTempData={flowTempData}
            rightbar={
              <Rightbar reportsData={reportsData} sessionData={sessionData} />
            }
          >
            {children}
          </DashboardChildrenWrapper>
        </div>
      </main>
    </ProtectedRouteWrapper>
  );
};
export default DashboardLayout;
