"use client";

import { SendIcon } from "@/components/icons";
import { useRecordStore } from "@/managers";
import { RecommendationResponse } from "@/types";
import { FetcherResult } from "@/utils";
import { FC, useState } from "react";
import { TbLoader2 } from "react-icons/tb";

interface ChatPromptProps {
  handlePrompt: (
    text: string
  ) => Promise<FetcherResult<RecommendationResponse>>;
}

export const ChatPrompt: FC<ChatPromptProps> = ({ handlePrompt }) => {
  const [promptText, setPromptText] = useState("");
  const setRecommendationChat = useRecordStore(
    (state) => state.setRecommendationChat
  );
  const [isLoading, setIsLoading] = useState(false);

  async function OnSubmit() {
    setIsLoading(true);
    const resp = await handlePrompt(promptText).finally(() =>
      setIsLoading(false)
    );
    setRecommendationChat(resp.data.recommendation);
    setPromptText("");
  }

  return (
    <div className="flex h-[90px] w-full justify-between gap-8 rounded-[14px] border-2 border-solid border-[#297FB8] bg-[#134663]/[0.11] p-[21px]">
      <textarea
        name="promt-input"
        id="prompt-input"
        placeholder="Can you explain how to change barometer settings"
        className="h-full w-full bg-transparent text-white outline-none"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        disabled={isLoading}
      />

      <button
        onClick={OnSubmit}
        disabled={isLoading}
        className="flex shrink-0 items-center gap-[10px] rounded-[30px] bg-[#297FB8] px-6 py-[10px]"
      >
        {!isLoading ? (
          <>
            <span className="text-xs font-semibold uppercase text-white">
              send
            </span>
            <SendIcon />
          </>
        ) : (
          <TbLoader2 className="animate-spin" size={13} color="white" />
        )}
      </button>
    </div>
  );
};
