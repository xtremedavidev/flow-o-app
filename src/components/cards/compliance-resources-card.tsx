"use client";

import { useComplianceStore } from "@/managers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useState } from "react";
import { MdReviews } from "react-icons/md";
import { TbLoader2 } from "react-icons/tb";
import { ResourcesListModal } from "../modals";
import { ResourceList, SearchEnvResp } from "@/types";
import Cookies from "js-cookie";
import { decryptToken, fetcher } from "@/utils";

interface ComplianceResourcesCardProps {
  topicsArr: string[];
}

export async function getEnvSearchResource(
  topic: string,
  tag: string,
  token: string | undefined
) {
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const envSearchResource = await fetcher<SearchEnvResp>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-search-resource`,
    {
      method: "GET",
      data: { topic, tag },
      token: decryptedToken,
    }
  );

  if (envSearchResource.error) {
    return { error: envSearchResource.error };
  }

  return envSearchResource;
}

export const ComplianceResourcesCard: FC<ComplianceResourcesCardProps> = ({
  topicsArr,
}) => {
  const topic = useComplianceStore((state) => state.topic);
  const tag = useComplianceStore((state) => state.tag);
  const setTopic = useComplianceStore((state) => state.setTopic);

  return (
    <div className="rounded-[9px] bg-white/5 px-5 py-[10px] text-[#F3F3F3]">
      <h2 className="text-base font-semibold capitalize">{tag}</h2>
      <p className="mt-5 text-sm font-semibold">
        Select topic{" "}
        <span className="text-[10px] font-normal text-[#BCBCBC]">
          {" "}
          (optional)
        </span>
      </p>

      <div className="mt-[10px] flex items-center gap-[10px] overflow-x-auto pb-2">
        {topicsArr.map((title, index) => (
          <ComplianceResourcesTitleItem
            key={index}
            selected={topic === title}
            title={title}
            handleClick={() => setTopic(title)}
          />
        ))}
      </div>

      <EnvSearchResource />
    </div>
  );
};

const EnvSearchResource = () => {
  const topic = useComplianceStore((state) => state.topic);
  const tag = useComplianceStore((state) => state.tag);
  const token = Cookies.get("token");

  const envSearchResource = useQuery({
    queryKey: ["envSearchResource", tag, topic],
    queryFn: () => getEnvSearchResource(topic, tag, token),
  });

  if (envSearchResource.isLoading) {
    return (
      <div className="my-4 flex w-full justify-center">
        <TbLoader2 size={28} color="white" className="animate-spin" />
      </div>
    );
  }

  if (!envSearchResource.isLoading && !envSearchResource.data) {
    return (
      <div className="my-4 text-center text-base font-medium text-white">
        No environmental search resource data
      </div>
    );
  }

  if (
    envSearchResource.data &&
    ("error" in envSearchResource.data ||
      envSearchResource.data.data.status === "Error")
  ) {
    return (
      <div className="my-4 text-center text-base font-medium text-white">
        Error occurred while getting environmental search resource
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-4 pb-2">
      {!envSearchResource.isLoading &&
        envSearchResource.data &&
        Object.keys(envSearchResource.data.data).length === 0 && (
          <div className="text-center text-base font-medium text-white">
            No environmental search resource for tag: <b>{tag}</b> and topic:{" "}
            <b>{topic}</b>
          </div>
        )}

      {envSearchResource.data &&
        (envSearchResource.data?.data?.status === "Success"
          ? envSearchResource.data.data.resources.map((resource, index) => (
              <TopicInfoCard
                key={resource.name}
                title={resource.name}
                desc={resource.notes}
                imgUrl={`/images/new-env-comp-img.svg`}
                readMoreUrl={resource.resource_list}
              />
            ))
          : null)}
    </div>
  );
};

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
  readMoreUrl: ResourceList[];
}

const TopicInfoCard: FC<TopicInfoCardProps> = ({
  imgUrl,
  title,
  desc,
  readMoreUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

        <button
          // href={readMoreUrl}
          // target="_blank"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-center gap-1 rounded-md bg-[#297FB8]/[0.53] py-[5px] text-[10px] font-normal"
        >
          Read more
          <MdReviews size={12} color="#ffffff" />
        </button>
      </div>

      <ResourcesListModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Resources List"
        resourseList={readMoreUrl}
      />
    </div>
  );
};
