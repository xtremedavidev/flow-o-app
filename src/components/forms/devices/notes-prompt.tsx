"use client";

import { MagicCardIcon, SendIcon } from "@/components/icons";
import { useRecordStore } from "@/managers";
import { RecommendationResponse } from "@/types";
import { FetcherResult } from "@/utils";
import { FC, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { toast } from "react-toastify";

interface NotesPromptProps {
  handlePrompt: (
    text: string,
    deviceID: string
  ) => Promise<FetcherResult<{ message: string }> | { error: string }>;
  deviceID: string;
}

export const NotesPrompt: FC<NotesPromptProps> = ({
  handlePrompt,
  deviceID,
}) => {
  const [promptText, setPromptText] = useState("");
  // const setRecommendationChat = useRecordStore(
  //   (state) => state.setRecommendationChat
  // );
  const [isLoading, setIsLoading] = useState(false);

  async function OnSubmit() {
    setIsLoading(true);
    const resp = await handlePrompt(promptText, deviceID).finally(() =>
      setIsLoading(false)
    );
    toast.info(!("error" in resp) ? resp.data.message : resp.error);
    // setRecommendationChat(resp.data.recommendation);
    setPromptText("");
  }

  return (
    <>
      <p className="my-4 flex items-center justify-center gap-[10px] text-sm font-semibold">
        <span>Type in your comment</span> <MagicCardIcon />
      </p>
      <div className="flex h-[90px] w-full justify-between gap-8 rounded-[14px] border-2 border-solid border-[#297FB8] bg-[#134663]/[0.11] p-[21px]">
        <textarea
          name="promt-input"
          id="prompt-input"
          placeholder="Type in a comment"
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
              <span className="text-xs font-semibold text-white">Add Note</span>
              <SendIcon />
            </>
          ) : (
            <TbLoader2 className="animate-spin" size={13} color="white" />
          )}
        </button>
      </div>
    </>
  );
};
