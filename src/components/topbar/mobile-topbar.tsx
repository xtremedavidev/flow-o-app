"use client";

import Image from "next/image";
import { NavBurger } from "./navburger";
import { useState } from "react";
import { MobileDrawer } from "./mobileDrawer";

export const MobileTopbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-3 lg:hidden">
        <Image
          alt="FlowOptix Logo"
          src="/images/flowoptix-logo-big.png"
          width={50}
          height={50}
        />
        <p className="text-lg font-semibold">FlowOptix</p>
      </div>

      <NavBurger open={isOpen} setOpen={setIsOpen} />
      <MobileDrawer open={isOpen} setOpen={setIsOpen} />
    </>
  );
};
