"use server";

import { DevicesDataResp, ReportsResponse, SessionDataResponse, SitesResponse, WellsResponse } from "@/types";
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


export async function getReports(decryptedToken: string | undefined){
   if (!decryptedToken) {
    toast.error("Session expired. Please login again");
    redirect("/login");
  }

  const reportsData = await fetcher<ReportsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-reports`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (!reportsData) {
    console.error("Failed to fetch reports data");
    toast.error("Failed to fetch reports data");
    return null;
  }

  return reportsData;
}

export async function getSessionData(decryptedToken: string | undefined){
   if (!decryptedToken) {
    toast.error("Session expired. Please login again");
    redirect("/login");
  }

  const sessionData = await fetcher<SessionDataResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-session-data`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (!sessionData) {
    console.error("Failed to fetch reports data");
    toast.error("Failed to fetch reports data");
    return null;
  }

  return sessionData;
}

export async function getRightbarData(decryptedToken: string | undefined){
  const sessionData = await getSessionData(decryptedToken);
  const reportsData = await getReports(decryptedToken);

  return { sessionData, reportsData };
}
