"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { LineChart } from "../charts";
import { GeneralInsightsData, useFetchGeneralInsights } from "@/hooks";
// import { getToken } from "@/utils";
import Cookies from "js-cookie";

interface OriginalData {
  x: string; // Time in HH:mm format
  y: string; // Value as string
  dataTypeName: string; // Category name
  date: string; // Date in ISO format
}

interface TransformedData {
  date: number; // Timestamp for the X-axis
  value: number; // Numerical value for the Y-axis
  category: string; // Category (e.g., "Flow Temp", "Pipeline Press.")
}

interface GeneralInsightsCardProps {
  generalInsightsChartData?: GeneralInsightsData[];
}

export const GeneralInsightsCard: FC<GeneralInsightsCardProps> = ({
  generalInsightsChartData,
}) => {
  const transformData = (data: OriginalData[]): TransformedData[] => {
    return data.map((item) => {
      // Combine date and time
      const dateTime = new Date(item.date);
      const [hours, minutes] = item.x.split(":").map(Number);
      dateTime.setUTCHours(hours, minutes, 0, 0);

      return {
        date: dateTime.getTime(), // Timestamp
        value: parseFloat(item.y) || 0, // Convert to number
        category: item.dataTypeName, // Category
      };
    });
  };

  const transformedData = generalInsightsChartData
    ? transformData(generalInsightsChartData)
    : [];

  const lineChartData = useMemo(
    () => transformedData,
    [generalInsightsChartData]
  );

  return (
    <div className="rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h2 className="text-xl font-medium">General Insight</h2>

      <div className="mt-[10px] text-xs font-normal text-[#BDBDBD]">
        Select Category
      </div>

      <hr className="my-[30px] w-full border-[1.5px] border-solid border-[#565656]/[0.35]" />

      {generalInsightsChartData && generalInsightsChartData?.length < 1 && (
        <div className="flex w-full justify-center">No insights chart data</div>
      )}

      {generalInsightsChartData && generalInsightsChartData?.length >= 1 && (
        <LineChart data={lineChartData} />
      )}
    </div>
  );
};
