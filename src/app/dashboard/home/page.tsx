"use client";

import {
  ActivesCard,
  GeneralInsightsCard,
  LocateWellCard,
  WellActivityCard,
} from "@/components";
import { useFetchGeneralInsights } from "@/hooks";
import { fetcher, getToken } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Metadata } from "next";
import { BsFillDeviceSsdFill } from "react-icons/bs";

// export const metadata: Metadata = {
//   title: "FlowOptix | Dashboard",
//   description: "Dashboard for FlowOptix",
// };

const DashboardHome = () => {
  // ---------------------------------------------------------------

  // const token = getToken();

  // const fetchUserData = async () => {
  //   return fetcher<unknown>(
  //     `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get`,
  //     {
  //       method: "POST",
  //       config: {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     },
  //   );
  // };

  // const { data, error, isLoading } = useQuery<unknown, Error>({
  //   queryKey: ["user-data"],
  //   queryFn: fetchUserData,
  // });

  // console.log("Niggaa---------", data, error, isLoading);

  // ---------------------------------------------------------------

  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-6">
        {ActiveCardArr.map((card) => (
          <ActivesCard
            key={card.label}
            icon={<card.icon />}
            label={card.label}
            amount={card.amount}
            desc={card.desc}
            percentage={card.percentage}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <div className="w-[45%]">
          <LocateWellCard />
        </div>
        <div className="w-[50%]">
          <WellActivityCard />
        </div>
      </div>

      <GeneralInsightsCard />
    </div>
  );
};
export default DashboardHome;

const ActiveCardArr = [
  {
    icon: BsFillDeviceSsdFill,
    label: "Active Wells",
    amount: "250",
    desc: "of 300 total",
    percentage: 83,
  },
  {
    icon: BsFillDeviceSsdFill,
    label: "Active Devices",
    amount: "200",
    desc: "of 400 total",
    percentage: 50,
  },
];
