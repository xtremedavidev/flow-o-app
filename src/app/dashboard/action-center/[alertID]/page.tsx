"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";

interface AlertsPageProps {
  params: {
    alertID: string;
  };
}

const AlertsPage: FC<AlertsPageProps> = ({ params }) => {
  const router = useRouter();
  return (
    <div className="h-full">
      <div>
        <button className="flex items-center gap-4">
          <FaAngleLeft
            size={16}
            color="#ffffff"
            onClick={() => router.back()}
          />
          <span className="text-2xl font-semibold">Alerts</span>
        </button>
      </div>

      <div className="mt-[30px]">
        <h1 className="text-2xl font-bold">Sensor Malfunction Alert</h1>
        <div className="mt-2 flex items-center gap-[18px]">
          <span className="text-[10px] font-normal text-[#717579]">
            AI system diagnostics
          </span>
          <span className="rounded-md bg-[#AF6105] px-2 py-1 text-xs font-normal text-white">
            Warning
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-2">
            <div>
              <FaRegClock size={19} color="#3984F3" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F1F1F1]">
                Alert Since
              </h3>
              <p className="text-[10px] font-normal text-[#717579]">
                Monday, October 31th, 2020
              </p>
            </div>
          </div>

          <div>
            <button className="flex items-center gap-5 rounded-[38px] border border-solid border-[#D7D7D7] px-[14px] py-[7px] text-sm font-normal">
              <HiChatBubbleBottomCenterText size={19} color="#3984F3" />
              <span>45 Comments</span>
            </button>
          </div>
        </div>
      </div>

      <hr className="my-4 h-[1px] w-full bg-[#525252]" />

      <div>
        <h2 className="text-sm font-semibold text-[#717579]">
          Alert Description
        </h2>

        <p className="mt-[18px] text-sm font-normal text-[#F1F1F1]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default AlertsPage;

const AISuggestions = () => {
  return <div></div>;
};
