import { Sidebar, Topbar } from "@/components";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <Topbar />

        <div className="h-[calc(100vh-100px)] overflow-hidden px-5 py-3">
          {children}
        </div>
      </div>
    </main>
  );
};
export default DashboardLayout;
