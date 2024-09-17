import { FC } from "react";

import {
  BackBtnWithText,
  ChatPrompt,
  MagicCardIcon,
  RecommendationChat,
  // RefreshIcon,
  RegenerateBtn,
  SendIcon,
} from "@/components";
import { BsStars } from "react-icons/bs";
import { FaMagic, FaRegClock } from "react-icons/fa";
import { decryptToken, formatDateToLocalString } from "@/utils";
import { getRecommendations, getRecommendationsChat } from "@/actions";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

interface AlertsPageProps {
  params: {
    alertID: string;
  };
}

const AlertsPage: FC<AlertsPageProps> = async ({ params }) => {
  const alertID = decryptToken(decodeURIComponent(params.alertID));

  const recommendationData = await getRecommendations(alertID);

  const handlePrompt = async (text: string) => {
    "use server";
    const resp = await getRecommendationsChat(alertID, text);
    // revalidateTag("getRecommendationsTag");
    return resp;
  };

  return (
    <div className="flex h-full max-h-full flex-col justify-between overflow-hidden">
      <div className="mb-4">
        <BackBtnWithText text="Alert" />
      </div>
      <div className="h-full max-h-[calc(100%-130px)] overflow-y-auto pr-2">
        <div className="mt-[30px]">
          <h1 className="text-2xl font-bold">
            {recommendationData.data &&
              recommendationData.data?.recommendation[0].report.title}
          </h1>
          <div className="mt-2 flex items-center gap-[18px]">
            <span className="text-[10px] font-normal text-[#717579]">
              AI system diagnostics
            </span>
            <span
              className={`rounded-md ${
                recommendationData.data &&
                recommendationData.data?.recommendation[0].report.level ===
                  "Critical"
                  ? "bg-[#FF4A4A]"
                  : recommendationData.data &&
                      recommendationData.data?.recommendation[0].report
                        .level === "Warning"
                    ? "bg-[#d48a2e]"
                    : "bg-[#3f9360]"
              } px-2 py-1 text-xs font-normal text-white`}
            >
              {recommendationData.data &&
                recommendationData.data?.recommendation[0].report.level}
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
                  {formatDateToLocalString(
                    recommendationData.data &&
                      recommendationData.data?.recommendation[0].updatedAt
                  )}
                </p>
              </div>
            </div>

            {/* <div>
              <button className="flex items-center gap-5 rounded-[38px] border border-solid border-[#D7D7D7] px-[14px] py-[7px] text-sm font-normal">
                <HiChatBubbleBottomCenterText size={19} color="#3984F3" />
                <span>45 Comments</span>
              </button>
            </div> */}
          </div>
        </div>

        <hr className="my-4 h-[1px] w-full bg-[#525252]" />

        <div>
          <h2 className="text-sm font-semibold text-[#717579]">
            Alert Description
          </h2>

          <p className="mt-[18px] text-xs font-normal text-[#F1F1F1]">
            {recommendationData.data &&
              recommendationData.data?.recommendation[0].report.description}
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
            <RegenerateBtn alertID={alertID} />
          </div>
        </div>

        <div className="w-full space-y-[10px]">
          {recommendationData.data &&
            recommendationData.data?.recommendation[0].recommendations.map(
              (rec: any, index: number) => {
                return (
                  <AISuggestionItem
                    key={index}
                    // title={}
                    details={rec}
                  />
                );
              }
            )}
        </div>

        <div className="mt-6 flex w-full flex-col gap-6">
          <RecommendationChat />
        </div>
      </div>

      <p className="my-4 flex items-center justify-center gap-[10px] text-sm font-semibold">
        <span>Generate more specific solution? Type in your Prompt</span>{" "}
        <MagicCardIcon />
      </p>

      <ChatPrompt handlePrompt={handlePrompt as any} />
    </div>
  );
};

export default AlertsPage;

interface AISuggestionItemProps {
  // title: string;
  details: string;
}

const AISuggestionItem: FC<AISuggestionItemProps> = ({ details }) => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="w-fit rounded-[10px] bg-[#297FB8]/[0.3] p-2">
        <BsStars size={24} color="#A9D7F5" />
      </div>
      <div className="w-full rounded-[10px] bg-[#297FB8]/[0.3] px-4 py-[14px] text-[#D0D0D0]">
        {/* <h4 className="text-base font-semibold">{title}</h4> */}
        <p className="text-sm font-normal">{details}</p>
      </div>
    </div>
  );
};
