"use server";

import { DevicesDataResp, SitesResponse, WellsResponse } from "@/types";
import { fetcher } from "@/utils";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export async function getDashboardCardData(decryptedToken: string | undefined) {
  if (!decryptedToken) {
    toast.error("Session expired. Please login again");
    redirect("/login");
  }

  const wellsDataPromise = fetcher<WellsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const devicesDataPromise = fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const sitesDataPromise = fetcher<SitesResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/site-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const [wellsData, devicesData, sitesData] = await Promise.all([
    wellsDataPromise,
    devicesDataPromise,
    sitesDataPromise,
  ]);

  if (!wellsData) {
    console.error("Failed to fetch wells data");
    toast.error("Failed to fetch wells data");
  }

  if (!devicesData) {
    console.error("Failed to fetch devices data");
    toast.error("Failed to fetch devices data");
  }

  if (!sitesData) {
    console.error("Failed to fetch sites data");
    toast.error("Failed to fetch sites data");
  }

  return { wellsData, devicesData, sitesData };
}
