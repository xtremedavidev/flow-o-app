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

export const Sidebar = () => {
  return (
    <div className="flex h-screen w-[292px] shrink-0 flex-col overflow-y-auto border-r border-solid border-[#297FB8]/20 px-9 pb-6 pt-5 2xl:pb-[66px]">
      <div className="flex h-[100px] items-center">
        <div className="rounded-[25px] bg-[#424242]/15 px-4 py-[5px]">
          <LogoWithText />
        </div>
      </div>

      <div className="mt-6 flex h-full flex-col justify-between gap-6 2xl:mt-[66px]">
        <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
          {SidebarListItemsArr.map((item, index) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              icon={<item.icon size={24} color="#ffffff" />}
              href={item.href}
            />
          ))}
        </div>

        <div>
          <button className="flex items-center gap-[10px] rounded-[10px] bg-[#297FB8] px-4 py-3 text-base font-normal">
            <Image
              alt="ai chatbot"
              width={32}
              height={32}
              src="/images/ai-chatbot-icon.svg"
            />
            <span>AI chatbot</span>
          </button>
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
              localStorage.removeItem("token");
            }}
            className="flex w-full items-center gap-[10px] rounded-[4px] bg-white/[0.08] px-4 py-3 text-base font-normal"
          >
            <FiLogOut size={24} color="#ffffff" />
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
  // isActive?: boolean;
}> = ({ label, icon, href }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
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
    href: "/dashboard/home",
  },
  {
    label: "Manage Devices",
    icon: BsFillDeviceSsdFill,
    href: "/dashboard/devices",
  },
  {
    label: "Action Center",
    icon: GoAlertFill,
    href: "/dashboard/action-center",
  },
  {
    label: "Reports",
    icon: MdPieChart,
    href: "/dashboard/reports",
  },
  {
    label: "Settings",
    icon: IoMdSettings,
    href: "/dashboard/settings",
  },
];
