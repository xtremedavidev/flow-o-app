import { MdDateRange } from "react-icons/md";
import { FilterButton } from "../buttons";
import { Timeline } from "../timeline";
import { events } from "@/libs";

export const DeviceActivities = () => {
  return (
    <div className="space-y-7 rounded-[27px] bg-[#252525] px-3 py-7">
      <div className="flex items-center justify-between px-[14px]">
        <h1 className="text-xs font-medium lg:text-base">Device Activities</h1>
        <div className="flex shrink-0 items-center gap-[10px]">
          <MdDateRange size={28} color="#ffffff" className="hidden lg:block" />
          <div className="w-full max-w-[100px] px-3 py-2 text-white">
            <select
              name="status"
              id="status"
              value=""
              className="h-full w-full border-none bg-transparent text-xs font-normal text-white outline-none ring-transparent"
            >
              <option value="" disabled>
                Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <FilterButton />
        </div>
      </div>
      <Timeline events={events} />
    </div>
  );
};
