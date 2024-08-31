"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { MdReviews } from "react-icons/md";

interface ComplianceResourcesCardProps {
  titles: string[];
}

export const ComplianceResourcesCard: FC<ComplianceResourcesCardProps> = ({
  titles,
}) => {
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div className="rounded-[9px] bg-white/5 px-5 py-[10px] text-[#F3F3F3]">
      <h2 className="text-base font-semibold">Compliance Resources</h2>
      <p className="mt-5 text-sm font-semibold">
        Select topic{" "}
        <span className="text-[10px] font-normal text-[#BCBCBC]">
          {" "}
          (optional)
        </span>
      </p>

      <div className="mt-[10px] flex items-center gap-[10px] overflow-x-auto pb-2">
        {TitlesArr.map((title, index) => (
          <ComplianceResourcesTitleItem
            key={index}
            selected={currentCard === index}
            title={title}
            handleClick={() => setCurrentCard(index)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 overflow-x-auto pb-2">
        {topicCardsArr.map((item, index) => (
          <TopicInfoCard
            key={index}
            desc={item.desc}
            title={item.title}
            imgUrl={`/images/demo-img-env.png`}
          />
        ))}
      </div>
    </div>
  );
};

const TitlesArr = [
  "Ecology",
  "Community",
  "Investments",
  "Climate Change",
  "Economy",
  "Grants",
  "Artificial Intelligence",
  "Federal Compliance",
  "Government",
];

interface ComplianceResourcesTitleItemProps {
  title: string;
  selected: boolean;
  handleClick: () => void;
}

const ComplianceResourcesTitleItem: FC<ComplianceResourcesTitleItemProps> = ({
  title,
  selected,
  handleClick,
}) => {
  return (
    <div
      className={`${selected ? "bg-[#086FB4]" : "bg-[#020F18]"} flex w-fit shrink-0 cursor-pointer rounded-[4px] px-2 py-1 text-[10px] font-normal text-[#BCBCBC]`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

interface TopicInfoCardProps {
  imgUrl: string;
  title: string;
  desc: string;
}

const TopicInfoCard: FC<TopicInfoCardProps> = ({ imgUrl, title, desc }) => {
  return (
    <div className="flex w-[239px] shrink-0 flex-col rounded-[20px] border border-solid border-[#297FB8] bg-black/45">
      <Image
        src={imgUrl}
        alt="img"
        height={100}
        width={100}
        className="h-[50%] w-full rounded-t-[20px] object-cover object-center"
      />
      <div className="flex flex-col gap-[6px] rounded-b-[20px] px-2 py-[10px]">
        <p className="text-xs font-semibold text-[#ECECEC]">{title}</p>

        <p className="text-[8px] font-normal text-[#F1F1F1]">{desc}</p>

        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#297FB8]/[0.53] py-[5px] text-[10px] font-normal">
          Read more
          <MdReviews size={12} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

const topicCardsArr = [
  {
    title:
      "Ecology synergy for sustainable green economy using artificial intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
  {
    title:
      "Ecology synergy for sustainable green economy using artificial intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
  {
    title:
      "Ecology synergy for sustainable green economy using artificial intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
  {
    title:
      "Ecology synergy for sustainable green economy using artificial intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
  {
    title:
      "Ecology synergy for sustainable green economy using artificial intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
];
