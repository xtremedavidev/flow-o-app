"use client";

import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsFillDeviceSsdFill } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { MdPieChart } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { BiSolidLeaf } from "react-icons/bi";
import Cookies from "js-cookie";
import { cn } from "@/utils";
import { ChatBot } from "../chatbot";

interface SidebarProps {
  className?: string;
  isNotMobile?: boolean;
  handleMobileNav?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  className,
  isNotMobile = true,
  handleMobileNav,
}) => {
  return (
    <div
      className={cn(
        `flex h-screen w-[292px] shrink-0 flex-col overflow-y-auto border-r border-solid border-[#297FB8]/20 px-9 pb-6 pt-5 2xl:pb-[66px]`,
        className
      )}
    >
      {isNotMobile && (
        <div className="flex h-[100px] items-center">
          <div className="rounded-[25px] bg-[#424242]/15 px-4 py-[5px]">
            <LogoWithText />
          </div>
        </div>
      )}

      <div className="my-6 flex h-full flex-col justify-between gap-6 2xl:mt-[66px]">
        <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
          {SidebarListItemsArr.map((item, index) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              icon={<item.icon size={24} color="#ffffff" />}
              href={item.href}
              onClick={isNotMobile ? undefined : handleMobileNav}
            />
          ))}
        </div>

        <div>
          <ChatBot />
        </div>

        <div className="space-y-[10px]">
          <div className="rounded-[41px] bg-[#353535]/15 px-2 py-[5px]">
            <div className="flex items-center gap-3">
              <Image
                alt="FlowOptix Logo"
                src="/images/flowoptix-logo-white.svg"
                width={40}
                height={40}
              />
              <p className="text-base font-normal">Company Name</p>
            </div>
          </div>

          <Link
            href="/login"
            onClick={() => {
              // localStorage.removeItem("token");
              Cookies.remove("token");
              if (!isNotMobile) handleMobileNav;
            }}
            className="flex w-full items-center gap-[10px] rounded-[4px] bg-white/[0.08] px-4 py-3 text-base font-normal"
          >
            <FiLogOut size={24} color="#ffffff" className="flex shrink-0" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const LogoWithText = () => {
  return (
    <div className="flex items-center gap-3">
      <Image
        alt="FlowOptix Logo"
        src="/images/flowoptix-logo-big.png"
        width={50}
        height={50}
      />
      <p className="text-2xl font-semibold">FlowOptix</p>
    </div>
  );
};

const SidebarItem: FC<{
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
  // isActive?: boolean;
}> = ({ label, icon, href, onClick }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex w-full items-center gap-[10px] rounded-[10px] px-4 py-3 ${isActive ? "bg-[#297FB8]" : "bg-transparent"}`}
    >
      {icon} <span className="text-base font-semibold text-white">{label}</span>
    </Link>
  );
};

const SidebarListItemsArr = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: "/home",
  },
  {
    label: "Manage Devices",
    icon: BsFillDeviceSsdFill,
    href: "/devices",
  },
  {
    label: "Action Center",
    icon: GoAlertFill,
    href: "/action-center",
  },
  {
    label: "Reports",
    icon: MdPieChart,
    href: "/reports",
  },
  {
    label: "Environmental \n Compliance",
    icon: BiSolidLeaf,
    href: "/env-compliance",
  },
  {
    label: "Settings",
    icon: IoMdSettings,
    href: "/settings",
  },
];
