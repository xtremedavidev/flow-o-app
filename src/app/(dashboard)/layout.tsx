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

  if (!token) {
    // If no token is available, redirect to the login page or handle gracefully
    return (
      <ProtectedRouteWrapper token={token}>
        <div className="flex h-screen items-center justify-center">
          <p className="text-red-500">Authentication token missing. Please log in.</p>
        </div>
      </ProtectedRouteWrapper>
    );
  }

  console.log("token", token)

  try {
    const flowTempData = await getDataTemplate();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROUTE_BASE_URL}/api/reports`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          cookie: `token=${token}`,
        },
        //credentials: "include",
      }
    );
    const datta: any = await res.json();
    const reportsData: ReportsResponse = JSON.parse(datta?.data)
    console.log("log ", datta)


    // Handle non-200 responses
    if (!res.ok) {
      throw new Error(`Failed to fetch reports: ${res.statusText}, ${reportsData}`);
    }

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
  } catch (error: any) {
    console.error("Error loading dashboard data:", error.message || error);

    // Show an error message if something goes wrong
    return (
      <ProtectedRouteWrapper token={token}>
        <div className="flex h-screen items-center justify-center">
          <p className="text-red-500">An error occurred while loading the dashboard.</p>
        </div>
      </ProtectedRouteWrapper>
    );
  }
};

export default DashboardLayout;
