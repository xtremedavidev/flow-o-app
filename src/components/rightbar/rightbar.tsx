import { LiaOilCanSolid } from "react-icons/lia";
import { RxExternalLink } from "react-icons/rx";
import { BiTask } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { SemiPieChart } from "../charts";

export const Rightbar = () => {
  return (
    <div className="flex h-full w-full max-w-[30%] shrink-0 flex-col overflow-y-auto rounded-2xl bg-[#333333] px-[14px] py-[19px]">
      <div className="w-full rounded-2xl bg-[#CBCBCB]/[0.06] px-[18px] py-[14px]">
        <h2 className="mb-6 text-base font-medium">Updates</h2>

        <SemiPieChart />
        <div className="flex items-center justify-between">
          {ConditionsArr.map((condition, index) => (
            <UpdateConditions
              key={index}
              colour={condition.colour}
              status={condition.status}
            />
          ))}
        </div>
      </div>

      <h2 className="my-4 text-sm font-medium">Recent Alerts</h2>

      <div className="space-y-[10px]">
        <PressureAlertCard />

        <SaveEnergyAlertCard />
      </div>
    </div>
  );
};

const UpdateConditions = ({
  colour,
  status,
}: {
  colour: string;
  status: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ background: colour }}
        className="flex h-[9px] w-[9px] shrink-0 rounded-full"
      />
      <span className="text-sm font-normal">{status}</span>
    </div>
  );
};

const ConditionsArr = [
  {
    colour: "#F94144",
    status: "Critical",
  },
  {
    colour: "#D48A2E",
    status: "Warning",
  },
  {
    colour: "#3F9360",
    status: "Resolved",
  },
];

const PressureAlertCard = () => {
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
              <UpdateConditions
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

const SaveEnergyAlertCard = () => {
  return (
    <div className="rounded-[10px] border-2 border-solid border-white/[0.09] bg-gradient-to-tr from-[#FF00B8]/[0.09] to-[#FF00C7]/[0.09] px-[10px] py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-[10px]">
          <FaHeart size={16} color="#24122D" />
        </div>
        <div>
          <h2 className="text-xs font-bold">Save more energy for later</h2>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[8px] font-normal">2024-06-28 10:32 AM</span>
            <span className="flex shrink-0 items-center justify-center rounded-md bg-[#8E5865] px-2 py-[2px] text-[8px] font-normal">
              Operational Suggestion
            </span>
          </div>

          <p className="mt-[6px] text-[10px] font-normal">
            The pressure in well XYZ has gone a lot more beyond safe limits.
          </p>
        </div>
      </div>

      <div className="mt-[10px] w-full">
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#24122D] py-[5px] text-[10px] font-normal">
          Read more
          <MdReviews size={12} color="#ffffff" />
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
