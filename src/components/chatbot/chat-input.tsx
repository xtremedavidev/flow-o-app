"use client";

import { useChatBotStore } from "@/managers";
import { FC, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { LuSendHorizonal } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChatbotMsg } from "@/server";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { GetChatMsgResp } from "@/types";

interface ChatPromptProps {
  page: number;
  handleSuccess?: (
    page: number,
    token: string | undefined
  ) => Promise<
    | GetChatMsgResp
    | {
        error: string;
      }
  >;
}

export const ChatBotInput: FC<ChatPromptProps> = ({ handleSuccess, page }) => {
  const token = Cookies.get("token");
  const [promptText, setPromptText] = useState("");
  const setShowChatHistory = useChatBotStore(
    (state) => state.setShowChatHistory
  );
  const setBotChat = useChatBotStore((state) => state.setBotChat);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (promptText: string) => sendChatbotMsg(promptText),
  });

  async function OnSubmit() {
    const resp = await mutation.mutateAsync(promptText);
    if ("error" in resp) {
      console.log("helloooo", resp.error);

      toast.error("Failed to send message, please try again.");
    } else {
      if (resp.message === "Success") {
        setShowChatHistory(true);
        // queryClient.invalidateQueries({ queryKey: ["getMsgResp"] });
        setPromptText("");
        handleSuccess &&
          handleSuccess(page, token).then((resp) => {
            if ("error" in resp) {
              toast.error("Failed to fetch chat history, please try again.");
            } else {
              setBotChat(resp);
            }
          });
      }
    }
  }

  return (
    <div className="mt-5 flex h-[64px] w-full justify-between justify-items-end gap-8 rounded-[14px] border-2 border-solid border-[#297FB8] bg-[#134663]/[0.11] px-[21px] py-[14px] text-sm font-normal">
      <textarea
        name="promt-input"
        id="prompt-input"
        placeholder="Type your message here..."
        className="h-full w-full bg-transparent text-white outline-none"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        disabled={mutation.isPending}
      />

      <button
        onClick={OnSubmit}
        disabled={mutation.isPending}
        className="flex shrink-0 items-center rounded-[30px]"
      >
        {!mutation.isPending ? (
          <LuSendHorizonal size={24} color="#4361EE" />
        ) : (
          <TbLoader2 className="animate-spin" size={13} color="white" />
        )}
      </button>
    </div>
  );
};
