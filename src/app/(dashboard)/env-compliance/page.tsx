import {
  BackBtnWithText,
  ComplianceResourcesCard,
  EnvIcon,
} from "@/components";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";

const titles = ["Ecology", "Community", "Investment", "Climate Change"];

const EnvCompliance = () => {
  return (
    <div>
      <div className="mb-4">
        <BackBtnWithText text="AI Regulatory" />
      </div>

      <div className="space-y-4 rounded-[7px] bg-[#1B262D]/[0.59] px-[14px] py-5">
        <div className="flex items-center justify-between rounded-[9px] bg-white/5 px-5 py-[10px] @container">
          <div>
            <h1 className="text-xl font-bold @xl:text-2xl">
              Environmental and Regulatory compliance info
            </h1>
            <p className="text-[10px] font-normal text-[#717579]">
              Last updated: 2 Weeks ago
            </p>
          </div>

          <FaEllipsisVertical
            className="flex shrink-0"
            size={20}
            color="#717579"
          />
        </div>

        <div className="rounded-[9px] bg-white/5 px-5 py-[10px]">
          <h2 className="text-base font-semibold">Regulatory Compliance</h2>
          <p className="mt-5 text-xs font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <ul className="my-4 list-disc space-y-3 pl-5 text-xs font-normal text-[#F1F1F1]">
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris{" "}
            </li>
          </ul>
        </div>

        <ComplianceResourcesCard titles={titles} />

        <div className="rounded-[9px] bg-white/5 px-5 py-[10px] text-[#F3F3F3]">
          <h2 className="text-base font-semibold text-[#F3F3F3]">
            Related Notifications
          </h2>

          <div className="space-y-[10px]">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvCompliance;

const NotificationCard = () => {
  return (
    <div className="cursor-pointer rounded-[10px] bg-black/45 px-[10px] py-2">
      <div className="">
        <div className="flex items-center gap-1">
          <Image
            width={20}
            height={20}
            alt="img"
            src="/images/env-icon.svg"
            className="aspect-square h-5 w-5"
          />
          <div className="w-full">
            <h2 className="text-xs font-bold">Save more energy for later</h2>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[8px] font-normal text-white/50 @md:text-xs">
                2024-06-28 10:32 AM
              </span>
              <span className="flex shrink-0 items-center justify-center rounded-md bg-[#5F5E7A] px-2 py-[2px] text-[8px] font-normal">
                Environmental Updates
              </span>
            </div>
          </div>
        </div>

        <p className="mt-[6px] text-[10px] font-normal">
          The pressure in well XYZ has gone a lot more beyond safe limits.
        </p>
      </div>

      <div className="mt-[10px] w-full">
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#297FB8]/[0.53] py-[5px] text-[10px] font-normal">
          Read more
          <MdReviews size={12} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};
