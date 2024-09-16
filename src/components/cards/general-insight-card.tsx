"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { LineChart } from "../charts";
// import { GeneralInsightsData } from "@/hooks";
// // import { getToken } from "@/utils";
// import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getGeneralInsightsChartData } from "@/actions";
import { FetcherResult } from "@/utils";
import { WellsResponse } from "@/types";
import { TbLoader2 } from "react-icons/tb";

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
  // generalInsightsChartData?: GeneralInsightsData[];
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
    queryFn: () =>
      getGeneralInsightsChartData(
        // "7206bdaf-79af-4a11-89b6-7fa14de2db7c"
        selectedCategory
      ),
    enabled: !!selectedCategory, // Only fetch when a category is selected
  });

  useEffect(() => {
    if (generalInsightsChartData.isSuccess) {
      const transformedData = transformData(
        generalInsightsChartData.data.data.data
      );
      setTransformedData(transformedData);
    }
  }, [generalInsightsChartData.isSuccess]);

  // const transformedData = generalInsightsChartData.data
  //   ? transformData(generalInsightsChartData.data.data.data)
  //   : [];

  const lineChartData = useMemo(
    () => transformedData,
    // [generalInsightsChartData.data?.data.data]
    [transformedData]
  );

  if (!wellsData) {
    return (
      <div className="flex w-full justify-center">No category data found</div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h2 className="text-xl font-medium">General Insight</h2>

      <select
        className="mt-[10px] border-none bg-transparent text-xs font-normal text-[#BDBDBD] outline-none"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled selected>
          Select Category
        </option>
        {wellsData.data.data.wells.map((well) => (
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

      {selectedCategory !== "" &&
        generalInsightsChartData.data?.data.data &&
        generalInsightsChartData.data?.data.data?.length >= 1 && (
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
