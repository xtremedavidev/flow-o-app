import { FC, PropsWithChildren } from "react";

export const DashboardPageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full min-h-full overflow-y-auto pr-5">{children}</div>
  );
};
