"use client";

import { useEffect, useState } from "react";
import { LineChart } from "../charts";
import { useFetchGeneralInsights } from "@/hooks";
import { getToken } from "@/utils";

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

export const GeneralInsightsCard = () => {
  const token = getToken();
  const well = "70367f55-d068-4871-bffd-e7727ac7a45d";
  const startDate = "2020-08-19";
  const endDate = "2024-12-30";

  const [chartData, setChartData] = useState<OriginalData[] | null>(null);

  const mutation = useFetchGeneralInsights({
    data: { well, startDate, endDate },
    token,
  });

  useEffect(() => {
    const fetchGeneralInsights = async () => {
      try {
        const res = await mutation.mutateAsync();
        console.log("Response data:", res.data);
        setChartData(res.data);
      } catch (error) {
        console.error("Error fetching general insights:", error);
      }
    };

    if (token) {
      fetchGeneralInsights();
    }
  }, []);

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

  const transformedData = chartData ? transformData(chartData) : [];

  return (
    <div className="rounded-2xl bg-[#297FB8]/10 px-[26px] py-[18px]">
      <h2 className="text-xl font-medium">General Insight</h2>

      <div className="mt-[10px] text-xs font-normal text-[#BDBDBD]">
        Select Category
      </div>

      <hr className="my-[30px] w-full border-[1.5px] border-solid border-[#565656]/[0.35]" />

      {chartData && <LineChart data={transformedData} />}
    </div>
  );
};
