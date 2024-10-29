"use client";

import { useRecordStore } from "@/managers";
import { FC, useEffect, useMemo, useRef } from "react";
import { BsStars } from "react-icons/bs";
import ReactMarkdown from "react-markdown";

export const RecommendationChat = () => {
  const recommededData = useRecordStore((state) => state.recommendationChat);

  const reversedChatHistory = useMemo(() => {
    if (!recommededData) {
      return [];
    }
    return [...recommededData].reverse();
  }, [recommededData]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [recommededData]);

  if (!recommededData) {
    return null;
  }

  return (
    <>
      {reversedChatHistory.map((recommedation) => (
        <div key={recommedation.id} className="flex w-full flex-col gap-6">
          <div className="flex w-full justify-end justify-self-end">
            <div className="w-full max-w-[70%] overflow-x-auto rounded-[10px] bg-[#297FB8]/[0.3] px-4 py-[14px] text-[#D0D0D0]">
              <ReactMarkdown>{recommedation.question}</ReactMarkdown>
            </div>
          </div>

          <div className="w-full max-w-[70%] space-y-[10px]">
            {recommedation.recommendations.map((rec, index) => {
              return <AISuggestionItem key={index} details={rec} />;
            })}
          </div>
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </>
  );
};

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
        <div className="overflow-x-auto text-sm font-normal">
          <ReactMarkdown>{details}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
