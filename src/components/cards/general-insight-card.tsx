"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { LineChart } from "../charts";
import { useQuery } from "@tanstack/react-query";
import { getGeneralInsightsChartData } from "@/server";
import { FetcherResult } from "@/utils";
import { WellsResponse } from "@/types";
import { TbLoader2 } from "react-icons/tb";

interface OriginalData {
  x: string;
  y: string;
  dataTypeName: string;
  date: string;
}

interface TransformedData {
  date: number;
  value: number;
  category: string;
}

interface GeneralInsightsCardProps {
  wellsData: FetcherResult<WellsResponse>;
}

export const GeneralInsightsCard: FC<GeneralInsightsCardProps> = ({
  // generalInsightsChartData,
  wellsData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [transformedData, setTransformedData] = useState<TransformedData[]>([]);

  const generalInsightsChartData = useQuery({
    queryKey: ["generalInsightsChartData", selectedCategory],
    queryFn: () => getGeneralInsightsChartData(selectedCategory),
    enabled: !!selectedCategory,
  });

  useEffect(() => {
    if (generalInsightsChartData.data?.data.data) {
      const newTransformedData = transformData(
        generalInsightsChartData.data.data.data
      );
      setTransformedData(newTransformedData);
    }
  }, [
    generalInsightsChartData.isSuccess,
    generalInsightsChartData.data?.data.data,
  ]);

  const lineChartData = useMemo(() => transformedData, [transformedData]);

  if (!wellsData) {
    return (
      <div className="flex w-full justify-center">No category data found</div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h2 className="text-xl font-medium">General Insight</h2>

      <select
        value=""
        className="mt-[10px] border-none bg-transparent text-xs font-normal text-[#BDBDBD] outline-none"
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
      >
        <option value="" disabled>
          Select Category
        </option>
        {wellsData.data?.data.wells.map((well) => (
          <option key={well.id} value={well.id}>
            {well.name}
          </option>
        ))}
      </select>

      <hr className="my-[30px] w-full border-[1.5px] border-solid border-[#565656]/[0.35]" />

      {generalInsightsChartData.isLoading && (
        <div className="flex w-full justify-center">
          <TbLoader2 size={32} color="white" className="animate-spin" />
        </div>
      )}

      {!generalInsightsChartData.isLoading &&
        generalInsightsChartData.data?.data.data &&
        generalInsightsChartData.data?.data.data?.length < 1 && (
          <div className="flex w-full justify-center">
            No insights chart data
          </div>
        )}

      {generalInsightsChartData.isSuccess &&
        generalInsightsChartData.data !== undefined &&
        generalInsightsChartData.data.data.data.length >= 1 && (
          <LineChart data={lineChartData} />
        )}

      {selectedCategory === "" && (
        <div className="flex w-full justify-center text-base font-medium">
          Select a category to view insights
        </div>
      )}
    </div>
  );
};

const transformData = (data: OriginalData[]): TransformedData[] => {
  return data.map((item) => {
    const dateTime = new Date(item.date);
    const [hours, minutes] = item.x.split(":").map(Number);
    dateTime.setUTCHours(hours, minutes, 0, 0);

    return {
      date: dateTime.getTime(),
      value: parseFloat(item.y) || 0,
      category: item.dataTypeName,
    };
  });
};
