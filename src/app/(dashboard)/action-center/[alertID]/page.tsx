import { FC } from "react";

import { BackBtnWithText, MagicCardIcon, RefreshIcon } from "@/components";
import { BsStars } from "react-icons/bs";
import { FaMagic, FaRegClock } from "react-icons/fa";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";

interface AlertsPageProps {
  params: {
    alertID: string;
  };
}

const AlertsPage: FC<AlertsPageProps> = ({ params }) => {
  return (
    <div className="flex h-full max-h-full flex-col justify-between overflow-hidden">
      <div className="mb-4">
        <BackBtnWithText text="Alert" />
      </div>
      <div className="h-full max-h-[calc(100%-130px)] overflow-y-auto pr-2">
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

          <p className="mt-[18px] text-xs font-normal text-[#F1F1F1]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="mb-[12px] mt-[30px] flex w-full items-center justify-between">
          <div className="flex items-center gap-[10px] px-[5px] py-[10px]">
            <span className="text-base font-semibold text-[#BBBBBB]">
              AI Suggestions
            </span>
            <FaMagic size={18} color="#CACACA" />
          </div>

          <div>
            <div className="flex w-fit items-center gap-3 rounded-[38px] bg-[#2251F8]/[0.15] px-[18px] py-2 text-xs font-normal text-[#3984F3]">
              <span>Regenerate</span>
              <RefreshIcon />
            </div>
          </div>
        </div>

        <div className="w-full space-y-[10px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <AISuggestionItem
              key={index}
              title="Check Sensor Connections"
              details="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          ))}
        </div>
      </div>

      <p className="my-4 flex items-center justify-center gap-[10px] text-sm font-semibold">
        <span>Generate more specific solution? Type in your Prompt</span>{" "}
        <MagicCardIcon />
      </p>

      <div className="h-[90px] w-full rounded-[14px] border-2 border-solid border-[#297FB8] bg-[#134663]/[0.11] p-[21px]">
        <textarea
          name="promt-input"
          id="prompt-input"
          placeholder="Can you explain how to change barometer settings"
          className="h-full w-full bg-transparent text-white outline-none"
        />
      </div>
    </div>
  );
};

export default AlertsPage;

interface AISuggestionItemProps {
  title: string;
  details: string;
}

const AISuggestionItem: FC<AISuggestionItemProps> = ({ title, details }) => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="w-fit rounded-[10px] bg-[#297FB8]/[0.3] p-2">
        <BsStars size={24} color="#A9D7F5" />
      </div>
      <div className="w-full space-y-[6px] rounded-[20px] bg-[#297FB8]/[0.3] px-4 py-[14px] text-[#D0D0D0]">
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-sm font-normal">{details}</p>
      </div>
    </div>
  );
};
