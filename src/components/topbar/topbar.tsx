import { MdDateRange } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { ProfileWName } from "../ui";
import { getCurrentDateInLocalString } from "@/utils";
import { MobileTopbar } from "./mobile-topbar";

export const Topbar = () => {
  const date = getCurrentDateInLocalString();
  return (
    <div className="flex h-[100px] w-full items-center justify-between border-b border-solid border-[#297FB8]/20 px-8">
      <div className="hidden items-center gap-2 text-sm font-normal lg:flex">
        <MdDateRange size={24} color="#ffffff" />
        <span>{date.date}</span>
      </div>
      <div className="relative hidden h-12 rounded-xl bg-[#323233] text-base font-normal lg:block">
        <input
          type="text"
          className="h-full w-full rounded-xl bg-transparent pl-[18px] pr-[42px]"
          placeholder="Search here by well id"
        />
        <FiSearch
          className="absolute right-[18px] top-1/2 -translate-y-1/2"
          size={24}
          color="#525256"
        />
      </div>
      <div className="hidden lg:block">
        <IoMdNotifications color="#ffffff" size={24} />
      </div>
      <div className="hidden lg:block">
        <ProfileWName />
      </div>
      <MobileTopbar />
    </div>
  );
};
