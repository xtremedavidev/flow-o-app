import {
  AddDeviceButton,
  DeviceListTable,
  FilterButton,
  ManageDevicesCard,
} from "@/components";
import { TbArrowsSort } from "react-icons/tb";

const DashboardDevices = () => {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <ManageDevicesCard />

      <div className="mb-5 mt-[26px] flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Devices List</h1>

        <AddDeviceButton />
      </div>

      <div className="flex w-full items-center justify-end gap-[10px]">
        <TbArrowsSort size={24} color="#ABAAAA" />
        <FilterButton />
      </div>

      <div className="mt-[10px]">
        <DeviceListTable />
      </div>
    </div>
  );
};
export default DashboardDevices;
