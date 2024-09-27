import Image from "next/image";
import { FC } from "react";
import { LiaClipboardListSolid } from "react-icons/lia";
import { toast } from "react-toastify";

interface UserChatItemProps {
  message: string;
  time: string;
}

export const UserChatItem: FC<UserChatItemProps> = ({ message, time }) => {
  return (
    <div>
      <div className="flex flex-col items-end">
        <div className="relative z-[120] mr-[10px] w-full max-w-[80%] rounded-t-xl rounded-bl-xl bg-[#DEE2E6] pb-8 pl-5 pr-4 pt-4 text-black">
          <p className="relative z-[120] text-wrap break-words text-xs font-normal">
            {message}
          </p>
          <Image
            src="/images/user-chat-triangle.svg"
            alt=""
            width={50}
            height={70}
            className="absolute bottom-[-30px] right-0 z-[100]"
          />
          <div className="absolute bottom-[-30px] z-[120] flex justify-end">
            <span className="text-xs text-[#888888]">{time}</span>
          </div>
        </div>

        <div className="relative z-[120] mt-[10px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2C70BF] p-1">
            <div className="h-full w-full rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BotChatItemProps {
  message: string;
  time: string;
}

export const BotChatItem: FC<BotChatItemProps> = ({ message, time }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast.success("Message copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy message!");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-start">
        <div className="relative z-[120] ml-[10px] w-full max-w-[80%] rounded-t-xl rounded-br-xl bg-[#232425] pb-8 pl-4 pr-5 pt-4 text-white">
          <p className="relative z-[120] text-wrap break-words text-xs font-normal">
            {message}
          </p>
          <div className="absolute bottom-0 right-[20px] flex w-fit translate-y-[50%] items-center justify-center rounded-lg bg-[#2C70BF] p-1">
            <LiaClipboardListSolid
              size={16}
              color="white"
              onClick={copyToClipboard}
            />
          </div>
          <Image
            src="/images/bot-chat-triangle.svg"
            alt=""
            width={50}
            height={70}
            className="absolute bottom-[-30px] left-0 z-[100]"
          />
          <div className="absolute bottom-[-30px] left-[55px] z-[120] flex justify-end">
            <span className="text-xs text-[#888888]">{time}</span>
          </div>
        </div>

        <div className="relative z-[120] mt-[10px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2C70BF] p-1">
            <Image
              alt="FlowOptix Logo"
              src="/images/flowoptix-logo-white.svg"
              width={40}
              height={40}
              className="aspect-square h-full w-full rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
