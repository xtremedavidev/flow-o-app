import { LiaOilCanSolid } from "react-icons/lia";
import { ConditionsItem } from "../ui";
import { RxExternalLink } from "react-icons/rx";
import { BiTask } from "react-icons/bi";

export const PressureAlertCard = () => {
  return (
    <div className="rounded-[10px] border-2 border-solid border-[#FF0000]/[0.19] bg-[#FF0000]/[0.11] px-[10px] py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex shrink-0 items-center justify-center rounded-full bg-[#A07C5A] p-[10px]">
          <LiaOilCanSolid size={16} color="#002137" />
        </div>
        <div>
          <h2 className="text-xs font-bold">High Pressure Detected</h2>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[8px] font-normal">2024-06-28 10:32 AM</span>
            <span className="flex shrink-0 items-center justify-center rounded-md bg-[#FF4A4A] px-2 py-[2px] text-[8px] font-normal">
              Critical
            </span>
          </div>

          <p className="mt-[6px] text-[10px] font-normal">
            The pressure in well XYZ has gone a lot more beyond safe limits.
          </p>

          <div className="mt-2 space-y-1 rounded-[10px] bg-white/5 px-[5px] py-1">
            {PressureUpdateArr.map((update, index) => (
              <ConditionsItem
                key={index}
                colour={update.color}
                status={update.desc}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[10px] flex items-center justify-between gap-2">
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#297FB8] py-[5px] text-[10px] font-normal">
          Expand Alert <RxExternalLink size={12} color="#ffffff" />
        </button>
        <button className="flex shrink-0 items-center justify-center gap-1 rounded-md bg-[#1F7541] px-2 py-[5px] text-[10px] font-normal">
          <BiTask size={12} color="#ffffff" /> Mark Resolved
        </button>
      </div>
    </div>
  );
};

const PressureUpdateArr = [
  {
    color: "#F94144",
    desc: "Reduce flow rate immediately",
  },
  {
    color: "#D48A2E",
    desc: "Monitor pressure levels for the next 24 hours",
  },
  {
    color: "#D48A2E",
    desc: "Contact site engineer if pressure remains high",
  },
];
