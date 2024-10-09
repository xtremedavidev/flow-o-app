"use server";

import { GeneralInsightsAPIResponse } from "@/hooks";
import {
  DataTemplate,
  DefaultResponse,
  DevicesDataResp,
  EnvTopicsAndTagsResp,
  GetChatMsgResp,
  GetMultipleSitesResponse,
  GetNotesResponse,
  GetSingleSiteResponse,
  GetSiteResponse,
  RecommendationResponse,
  RecordsData,
  ReportsResponse,
  ReportTableHeaderResponse,
  SearchEnvResp,
  SendChatMsgResponse,
  SessionDataResponse,
  SitesResponse,
  SystemEfficiency,
  WellActivityChartResp,
  WellsResponse,
} from "@/types";
import { decryptToken, encryptToken, fetcher } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { toast } from "react-toastify";
import { FetcherResult } from "../utils/fetcher";
import { unstable_cache } from "next/cache";
// import { redirect } from "next/navigation";
// import { toast } from "react-toastify";

export async function getDashboardCardData() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const wellsDataPromise = fetcher<WellsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  const devicesDataPromise = fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  const sitesDataPromise = fetcher<SitesResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/site-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
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



export async function getSessionData() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const sessionData = await fetcher<SessionDataResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-session-data`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  if (!sessionData) {
    throw new Error("Failed to fetch reports data");
  }

  return sessionData;
}

export async function getReports() {
  const token = cookies().get("token")?.value;

  const resp =
    // unstable_cache(
    async () => {
      const decryptedToken = token
        ? decryptToken(decodeURIComponent(token))
        : undefined;

      // if (!token) {
      //   throw new Error("Session expired. Please login again");
      // }

      const reportsData = await fetcher<ReportsResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-reports`,
        {
          method: "GET",
          data: {},
          token: decryptedToken,
          // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
        }
      );

      if (!reportsData) {
        throw new Error("Failed to fetch reports data");
      }

      return reportsData;
    };
  // ,
  // undefined,
  // { tags: ["getReportsTag"], revalidate: 60 }
  // );

  const data = await resp();

  return data;
}


export async function getRightbarData() {
  const sessionData = await getSessionData();
  const reportsData = await getReports();

  return { sessionData, reportsData };
}

export async function getTableHeaderForReportData() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const reportTableHeaderData = await fetcher<ReportTableHeaderResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-flow-datas`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
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

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const recordsData = await fetcher<RecordsData>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  if (!recordsData) {
    throw new Error("Failed to fetch reports data");
  }

  return recordsData;
}

export async function getGeneralInsightsChartData(wellID: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

  const generalInsightsChartData = await fetcher<GeneralInsightsAPIResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-graph-data`,
    {
      method: "POST",
      data: {
        well: wellID,
        startDate: "2020-08-19",
        endDate: formattedDate,

      },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
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
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  console.log("resolved---------------->", res);

  revalidatePath("/");
  revalidatePath("/action-center");
  return res;
}

export const getRecommendations = async (id: string) => {
  const token = cookies().get("token")?.value;

  const resp = unstable_cache(
    async () => {
      const decryptedToken = token
        ? decryptToken(decodeURIComponent(token))
        : undefined;

      // if (!token) {
      //   throw new Error("Session expired. Please login again");
      // }

      const recommendationData = await fetcher<RecommendationResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-recommendations`,
        {
          method: "POST",
          data: { reportId: id },
          token: decryptedToken,
          // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
        }
      );

      if (!recommendationData) {
        throw new Error("Failed to fetch recommendation data");
      }

      // console.log("recData=---------------->", recommendationData.data.recommendation[recommendationData.data.recommendation.length - 1].recommendations);

      return recommendationData;
    },
    undefined,
    {
      tags: ["getRecommendationsTag"],
    }
  );

  const data = await resp();
  return data;
};

export async function getRecommendationsChat(id: string, question: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const recommendationChatData = await fetcher<RecommendationResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/send-question-recommendation-chat`,
    {
      method: "POST",
      data: { question: question, reportId: id },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  if (!recommendationChatData) {
    throw new Error("Failed to fetch recommendation chat data");
  }

  return recommendationChatData;
}

export async function getSites(
  id: string
): Promise<FetcherResult<GetSingleSiteResponse>>;
export async function getSites(
  id?: undefined
): Promise<FetcherResult<GetMultipleSitesResponse>>;

export async function getSites(
  id?: string
): Promise<FetcherResult<GetSiteResponse<typeof id>>> {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const sitesData = await fetcher<GetSiteResponse<typeof id>>(
    `${process.env.NEXT_PUBLIC_BASEURL}/site-gateway/get`,
    {
      method: "POST",
      data: { id },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  if (!sitesData) {
    throw new Error("Failed to fetch sites data");
  }

  return sitesData;
}

export async function getWells(id?: string, siteId?: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const wellsData = await fetcher<WellsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/get`,
    {
      method: "POST",
      data: { id, siteId },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  if (!wellsData) {
    throw new Error("Failed to fetch wells data");
  }

  return wellsData;
}

export async function getDevices(id?: string, wellId?: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const devicesData = await fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: { id, wellId },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
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

  // if (!token) {
  //   throw new Error("Session expired. Please login again");
  // }

  const noteData = await fetcher<{ message: string }>(
   ` ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/create-note`,
    {
      method: "POST",
      data: { note: text, iotId: deviceID },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  if (!noteData) {
    throw new Error("Failed to create note");
  }

  return noteData;
}


export const getNotes = async (deviceID: string) => {
  const token = cookies().get("token")?.value;

  const resp = 
  // unstable_cache(
    async function () {
      const decryptedToken = token
        ? decryptToken(decodeURIComponent(token))
        : undefined;

      // if (!token) {
      //   throw new Error("Session expired. Please login again");
      // }

      const notesData = await fetcher<GetNotesResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-notes`,
        {
          method: "GET",
          data: { iotId: deviceID },
          token: decryptedToken,
          // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
        }
      );

      if (!notesData) {
        throw new Error("Failed to create note");
      }

      return notesData;
    }
  //   ,
  //   undefined,
  //   {
  //     tags: ["getNotesTag"],
  //   }
  // );

  const data = await resp();

  return data;
};

export async function getSystemEfficiency(wellId: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  

  const sysEffData = await fetcher<SystemEfficiency>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-system-efficiency`,
    {
      method: "GET",
      data: { wellId },
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

   if (sysEffData.error) {
    return { error: sysEffData.error };
  }

  return sysEffData.data;
}

interface LoginResponse extends DefaultResponse {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    onBoardingDone: boolean;
  };
}

export async function handleLogin(identifier: string, password: string) {
  const loginData = await fetcher<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/login`,
        {
          method: "POST",
          data: { identifier, password },
        }
      );

  if (loginData?.data?.message !== "success") {
    return { error: loginData?.data?.message || loginData.error };
  }

   const encryptedToken = encodeURIComponent(encryptToken(loginData.data.token));

  await cookies().set("token", encryptedToken);

  return {loginData: loginData.data};
}

export async function getDataTemplate() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const flowDataTemp = await fetcher<DataTemplate>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-flow-datas`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

   if (flowDataTemp.error) {
    return { error: flowDataTemp.error };
  }

  return flowDataTemp.data;
}

export async function saveDataTemplate(compData: {
    compData: { compDataName: string; flowDataName: string }[]
}) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const flowDataTemp = await fetcher<{
    data: unknown
    error: string}>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/save-company-data-type`,
    {
      method: "POST",
      data: {compData: compData.compData},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  

   if (flowDataTemp.error) {
    return { error: flowDataTemp.error };
  }

  return flowDataTemp.data;
}

export async function sendChatbotMsg(message: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const sendMsgResp = await fetcher<SendChatMsgResponse>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/send-chat`,
    {
      method: "POST",
      data: {message},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  

   if (sendMsgResp.error) {
    return { error: sendMsgResp.error };
  }

  return sendMsgResp.data;
}


export async function getChatbotMsg(page: number) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const getMsgResp = await fetcher<GetChatMsgResp>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-chat-history`,
    {
      method: "GET",
      data: {page},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  

   if (getMsgResp.error) {
    return { error: getMsgResp.error };
  }

  return getMsgResp.data;
}

export async function getWellActivityChart() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const wellActivityChart = await fetcher<WellActivityChartResp[]>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/well-activity-graph`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  

   if (wellActivityChart.error) {
    return { error: wellActivityChart.error };
  }

  return wellActivityChart;
}

export async function getEnvTopicsTags() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const envTopicsAndTags = await fetcher<EnvTopicsAndTagsResp>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-topics-tags`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

  

   if (envTopicsAndTags.error) {
    return { error: envTopicsAndTags.error };
  }

  return envTopicsAndTags;
}

export async function getEnvSearchResource(topic: string, tag: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const envSearchResource = await fetcher<SearchEnvResp>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-search-resource`,
    {
      method: "GET",
      data: {topic, tag},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

   if (envSearchResource.error) {
    return { error: envSearchResource.error };
  }

  return envSearchResource;
}

export async function getTotalSystemEff() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const totalSysEff = await fetcher<SystemEfficiency>(`
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-total-system-efficiency`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
      // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
    }
  );

   if (totalSysEff.error) {
    return { error: totalSysEff.error };
  }

  return totalSysEff;
}