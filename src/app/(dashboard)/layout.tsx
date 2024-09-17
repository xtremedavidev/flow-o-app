import {
  DashboardChildrenWrapper,
  ProtectedRouteWrapper,
  Rightbar,
  Sidebar,
  Topbar,
} from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { toast } from "react-toastify";

interface DashboardLayoutProps extends PropsWithChildren {}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  // const token = await new Promise<string>((resolve, reject) => {
  //   const token = cookies().get("token")?.value;

  //   if (token) {
  //     resolve(token);
  //   } else {
  //     reject(toast.error("Token not found"));
  //     redirect("/login");
  //   }
  // });

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
