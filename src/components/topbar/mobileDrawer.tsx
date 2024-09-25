import Link from "next/link";
import { FC } from "react";
import { MobileDrawerWrapper } from "./mobileNavWrapper";
import { Sidebar } from "../sidebar";

export interface MobileDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // pathname: string;
}

export const MobileDrawer: FC<MobileDrawerProps> = ({
  open,
  setOpen,
  // pathname,
}) => {
  return (
    <MobileDrawerWrapper open={open}>
      <Sidebar
        className="relative z-[100] w-full lg:hidden"
        isNotMobile={false}
        handleMobileNav={() => setOpen(false)}
      />
    </MobileDrawerWrapper>
  );
};
