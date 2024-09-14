"use server";

import { GeneralInsightsAPIResponse } from "@/hooks";
import {
  DevicesDataResp,
  GetMultipleSitesResponse,
  GetNotesResponse,
  GetSingleSiteResponse,
  GetSiteResponse,
  RecommendationResponse,
  RecordsData,
  ReportsResponse,
  ReportTableHeaderResponse,
  SessionDataResponse,
  SitesResponse,
  WellsResponse,
} from "@/types";
import { decryptToken, fetcher } from "@/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
import { FetcherResult } from '../utils/fetcher';
// import { redirect } from "next/navigation";
// import { toast } from "react-toastify";

export async function getDashboardCardData() {

    const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
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
    throw new Error("Failed to fetch wells data");
  }

  if (!devicesData) {
    throw new Error("Failed to fetch devices data");
  }

  if (!sitesData) {
    throw new Error("Failed to fetch sites data");
  }

  return { wellsData, devicesData, sitesData };
}

export async function getReports() {

    const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
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
    throw new Error("Failed to fetch reports data");
  }

  return reportsData;
}

export async function getSessionData() {

  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
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
    throw new Error("Failed to fetch reports data");
  }

  return sessionData;
}

export async function getRightbarData() {

  const sessionData = await getSessionData();
  const reportsData = await getReports();

  return { sessionData, reportsData };
}

export async function getTableHeaderForReportData(
 
) {

  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const reportTableHeaderData = await fetcher<ReportTableHeaderResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-flow-datas`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (!reportTableHeaderData) {
    throw new Error("Failed to fetch reports table header data");
  }

  return reportTableHeaderData;
}

export async function getRecords() {

  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const recordsData = await fetcher<RecordsData>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  if (!recordsData) {
    throw new Error("Failed to fetch reports data");
  }

  return recordsData;
}

export async function getGeneralInsightsChartData(

  wellID: string
) {

  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const generalInsightsChartData = await fetcher<GeneralInsightsAPIResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-graph-data`,
    {
      method: "POST",
      data: {
        well: wellID,
      },
      token: decryptedToken,
    }
  );

  if (!generalInsightsChartData) {
    throw new Error("Failed to fetch reports data");
  }

  return generalInsightsChartData;
}

export async function handleResolve(id: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

    const decryptedID = decryptToken(decodeURIComponent(id));

  const res = await fetcher<{ message: string }>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/resolve-report`,
    {
      method: "POST",
      data: { reportId: decryptedID },
      token: decryptedToken,
    }
  );

  console.log("resolved---------------->", res);
  
  revalidatePath("/")
  revalidatePath("/action-center")
  return res;
}


export async function getRecommendations(id: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

     if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const recommendationData = await fetcher<RecommendationResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-recommendations`,
    {
      method: "POST",
      data: { reportId: id },
      token: decryptedToken,
    }
  );

   if (!recommendationData) {
    throw new Error("Failed to fetch recommendation data");
  }

  // console.log("recData=---------------->", recommendationData.data.recommendation[recommendationData.data.recommendation.length - 1].recommendations);
  
  return recommendationData;
}

export async function getRecommendationsChat(id: string, question: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

     if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const recommendationChatData = await fetcher<RecommendationResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/send-question-recommendation-chat`,
    {
      method: "POST",
      data: { question: question, reportId: id },
      token: decryptedToken,
    }
  );

   if (!recommendationChatData) {
    throw new Error("Failed to fetch recommendation chat data");
  }

  
  return recommendationChatData;
}

export async function getSites(id: string): Promise<FetcherResult<GetSingleSiteResponse>>; 
export async function getSites(id?: undefined): Promise<FetcherResult<GetMultipleSitesResponse>>; 

export async function getSites(id?: string): Promise<FetcherResult<GetSiteResponse<typeof id>>> {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const sitesData = await fetcher<GetSiteResponse<typeof id>>(
    `${process.env.NEXT_PUBLIC_BASEURL}/site-gateway/get`,
    {
      method: "POST",
      data: { id },
      token: decryptedToken,
    }
  );

  if (!sitesData) {
    throw new Error("Failed to fetch sites data");
  }

  return sitesData;
}

export async function getWells(id?: string, siteId?:string ){
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const wellsData = await fetcher<WellsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/get`,
    {
      method: "POST",
      data: { id , siteId },
      token: decryptedToken,
    }
  );

  if (!wellsData) {
    throw new Error("Failed to fetch wells data");
  }

  return wellsData;
}

export async function getDevices(id?: string, wellId?:string ){
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const devicesData = await fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: { id , wellId },
      token: decryptedToken,
    }
  );

  if (!devicesData) {
    throw new Error("Failed to fetch devices data");
  }

  return devicesData;
}

export async function createNote(text: string, deviceID: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const noteData = await fetcher<{message: string}>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/create-note`,
    {
      method: "POST",
      data: { text: text , iotId: deviceID },
      token: decryptedToken,
    }
  );

  if (!noteData) {
    throw new Error("Failed to create note");
  }

  return noteData;
}

export async function getNotes(deviceID: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  if (!decryptedToken) {
    throw new Error("Session expired. Please login again");
  }

  const notesData = await fetcher<GetNotesResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-notes`,
    {
      method: "GET",
      data: { iotId: deviceID },
      token: decryptedToken,
    }
  );

  if (!notesData) {
    throw new Error("Failed to create note");
  }

  return notesData;
}