"use client";

import { ModalProps } from "@/types";
import Image from "next/image";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { RxCrossCircled } from "react-icons/rx";
import { ChatBotInput } from "./chat-input";
import { BotChatItem, UserChatItem } from "./chat-item";
import { useQuery } from "@tanstack/react-query";
import { getChatbotMsg, sendChatbotMsg } from "@/actions";
import { useChatBotStore } from "@/managers";
import { formatDate } from "@/utils";
import { TbLoader2 } from "react-icons/tb";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBot = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpenBot}
        className="flex items-center gap-[10px] rounded-[10px] bg-[#297FB8] px-4 py-3 text-base font-normal"
      >
        <Image
          alt="ai chatbot"
          width={32}
          height={32}
          src="/images/ai-chatbot-icon.svg"
        />
        <span>AI chatbot</span>
      </button>

      <ChatModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

interface ChatModalProps extends ModalProps {}

const ChatModal: FC<ChatModalProps> = ({ isOpen, setIsOpen }) => {
  const [page, setPage] = useState(1);
  const showChatHistory = useChatBotStore((state) => state.showChatHistory);
  const botChat = useChatBotStore((state) => state.botChat);

  // const setBotChat = useChatBotStore((state) => state.setBotChat);

  // const sendMsgResp = useQuery({
  //   queryKey: ["getMsgResp", page],
  //   queryFn: () => getChatbotMsg(page),
  //   // enabled: showChatHistory,
  // });

  // console.log("sendMsgResp", sendMsgResp.data);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const reversedBotChat = useMemo(() => {
    if (botChat) {
      return [...botChat].reverse();
    }
    return null;
  }, [botChat]);

  const handleCloseBot = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [reversedBotChat]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex h-screen w-full items-center justify-center bg-black/80 px-[5%] backdrop-blur-md">
      <div className="h-full max-h-[90vh] w-full max-w-[400px] overflow-hidden rounded-[20px]">
        <div className="flex w-full items-center justify-between rounded-t-[20px] bg-[#185C9A] px-6 py-5">
          <LogoWithText />
          <RxCrossCircled
            size={24}
            color="white"
            onClick={handleCloseBot}
            className="cursor-pointer"
          />
        </div>

        <div className="flex h-full w-full flex-col rounded-b-[20px] bg-[#161515] p-4">
          <div
            ref={chatContainerRef}
            className="h-full max-h-[calc(90vh-200px)] overflow-y-auto pr-2"
          >
            {!showChatHistory && (
              <div className="flex w-full justify-center text-center">
                Type in the chat box to start a conversation...
              </div>
            )}

            {showChatHistory &&
              botChat &&
              reversedBotChat &&
              reversedBotChat.map((msgData) => (
                <>
                  <UserChatItem
                    message={msgData.message}
                    time={formatDate(msgData.timestamp).formattedTime}
                  />

                  <BotChatItem
                    message={msgData.response}
                    time={formatDate(msgData.timestamp).formattedTime}
                  />
                </>
              ))}
          </div>

          <ChatBotInput page={page} handleSuccess={getChatbotMsg} />
        </div>
      </div>
    </div>,
    document.body
  );
};

const LogoWithText = () => {
  return (
    <div className="flex items-center gap-3">
      <Image
        alt="FlowOptix Logo"
        // src="/images/flowoptix-logo-big.png"
        src="/images/flowoptix-logo-white.svg"
        width={40}
        height={40}
      />
      <p className="text-2xl font-bold">FlowOptix</p>
    </div>
  );
};
