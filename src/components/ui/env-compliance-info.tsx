"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { ComplianceResourcesCard } from "../cards";
import { FetcherResult } from "@/utils";
import { EnvTopicsAndTagsResp } from "@/types";
import Image from "next/image";
import { MdReviews } from "react-icons/md";
import { TagItem } from "../selects";
import { useComplianceStore } from "@/managers";

interface EnvComplianceInfoProps {
  envTopicsAndTags: FetcherResult<EnvTopicsAndTagsResp>;
}

export const EnvComplianceInfo: FC<EnvComplianceInfoProps> = ({
  envTopicsAndTags,
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-[7px] bg-[#1B262D]/[0.59] px-[14px] py-5 lg:max-w-[70%]">
      <div className="flex items-center justify-between rounded-[9px] bg-white/5 px-5 py-[10px] @container">
        <div>
          <h1 className="text-lg font-bold @xl:text-xl">
            Environmental and Regulatory compliance info
          </h1>
        </div>
        {/* <FaEllipsisVertical
          className="flex shrink-0"
          size={20}
          color="#717579"
        /> */}
      </div>

      <ComplianceResourcesCard topicsArr={envTopicsAndTags.data.topics} />
      {/* <div className="rounded-[9px] bg-white/5 px-5 py-[10px] text-[#F3F3F3]">
        <h2 className="text-base font-semibold text-[#F3F3F3]">
          Related Notifications
        </h2>
        <div className="space-y-[10px]">
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </div>
      </div> */}
    </div>
  );
};

const NotificationCard = () => {
  return (
    <div className="cursor-pointer rounded-[10px] bg-black/45 px-[10px] py-2">
      <div className="">
        <div className="flex items-center gap-1">
          <Image
            width={20}
            height={20}
            alt="img"
            src="/images/env-icon.svg"
            className="aspect-square h-5 w-5"
          />
          <div className="w-full">
            <h2 className="text-xs font-bold">Save more energy for later</h2>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[8px] font-normal text-white/50 @md:text-xs">
                2024-06-28 10:32 AM
              </span>
              <span className="flex shrink-0 items-center justify-center rounded-md bg-[#5F5E7A] px-2 py-[2px] text-[8px] font-normal">
                Environmental Updates
              </span>
            </div>
          </div>
        </div>

        <p className="mt-[6px] text-[10px] font-normal">
          The pressure in well XYZ has gone a lot more beyond safe limits.
        </p>
      </div>

      <div className="mt-[10px] w-full">
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#297FB8]/[0.53] py-[5px] text-[10px] font-normal">
          Read more
          <MdReviews size={12} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

interface EnvCompSelectTagsProps {
  envTopicsAndTags: FetcherResult<EnvTopicsAndTagsResp>;
}

interface Tags {
  carbon: string[];
  oil: string[];
  energy: string[];
  royalty: string[];
  well: string[];
  policy: string[];
  law: string[];
}

export const EnvCompSelectTags: FC<EnvCompSelectTagsProps> = ({
  envTopicsAndTags,
}) => {
  const tag = useComplianceStore((state) => state.tag);
  const setTag = useComplianceStore((state) => state.setTag);
  const setTopic = useComplianceStore((state) => state.setTopic);

  useEffect(() => {
    if (!tag && envTopicsAndTags.data) {
      setTag(envTopicsAndTags.data.tags.carbon[0]);
      setTopic(envTopicsAndTags.data.topics[0]);
    }
  }, []);

  const handleChange = (selectedTag: string) => {
    setTag(selectedTag);
  };

  const tags = envTopicsAndTags.data.tags;

  const tagData = Object.keys(tags).map((key) => {
    const typedKey = key as keyof Tags;
    return {
      label: typedKey,
      tags: tags[typedKey],
    };
  });

  return (
    <div className="h-full w-full overflow-y-auto rounded-[7px] bg-[#1B262D]/[0.59] px-[14px] py-5 lg:max-w-[30%]">
      <h2 className="mb-[10px] text-xs font-semibold text-[#F3F3F3]">
        Select tags
      </h2>

      <div className="flex flex-col gap-4">
        {tagData.map((data, idx) => (
          <TagItem
            key={idx}
            label={data.label}
            tags={data.tags}
            selectedTag={tag}
            onTagChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

// interface EnvCompClientWrapperProps extends PropsWithChildren {
//   envTopicsAndTags: FetcherResult<EnvTopicsAndTagsResp>;
// }

// export const EnvCompClientWrapper: FC<EnvCompClientWrapperProps> = ({
//   envTopicsAndTags,
//   children,
// }) => {
//   const setTag = useComplianceStore((state) => state.setTag);
//   const setTopic = useComplianceStore((state) => state.setTopic);

//   useEffect(() => {
//     if (envTopicsAndTags.data) {
//       setTag(envTopicsAndTags.data.tags.carbon[0]);
//       setTopic(envTopicsAndTags.data.topics[0]);
//     }
//   }, []);

//   return <>{children}</>;
// };
