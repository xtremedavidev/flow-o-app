import { MdDateRange } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";

export const Topbar = () => {
  return (
    <div className="flex h-[100px] w-full items-center justify-between border-b border-solid border-[#297FB8]/20 px-8">
      <div className="flex items-center gap-2 text-sm font-normal">
        <MdDateRange size={24} color="#ffffff" />
        <span>May 19, 2023</span>
      </div>

      <div className="relative h-12 rounded-xl bg-[#323233] text-base font-normal">
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

      <div>
        <IoMdNotifications color="#ffffff" size={24} />
      </div>

      <div className="flex items-center gap-2 rounded-[41px] bg-[#353535]/[0.14] px-[14px] py-[10px]">
        <div className="h-[40px] w-[40px] rounded-full bg-white"></div>
        <span className="text-xl font-normal">Jane</span>
      </div>
    </div>
  );
};
