import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";

export const SaveEnergyAlertCard = () => {
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
