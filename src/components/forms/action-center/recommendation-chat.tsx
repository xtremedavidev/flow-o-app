"use client";

import { useRecordStore } from "@/managers";
import { FC, useEffect, useMemo, useRef } from "react";
import { BsStars } from "react-icons/bs";

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
          <div className="w-full max-w-[65%] rounded-[10px] bg-[#297FB8]/[0.3] px-4 py-[14px] text-[#D0D0D0]">
            {recommedation.question}
          </div>

          <div className="flex w-full justify-end justify-self-end">
            <div className="w-full max-w-[65%] space-y-[10px]">
              {recommedation.recommendations.map((rec, index) => {
                return <AISuggestionItem key={index} details={rec} />;
              })}
            </div>
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
        <p className="text-sm font-normal">{details}</p>
      </div>
    </div>
  );
};
